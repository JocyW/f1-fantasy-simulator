import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import Calendar from "./models/races/Calendar";
import BasedOnWeightedHistoryDataGenerator from "./models/generators/BasedOnWeightedHistoryDataGenerator";
import {jocysLeague} from "./rosters";
import CsvExporter from "./models/exporter/CsvExporter";
import rostersJSON from "../assets/brute_force.json";

export const DEBUG_ENABLED = false;

const getData = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.exporter = new CsvExporter({
        basePath: './dist/exports/weekend_object',
    })
    calendar.drivers = Object.values(drivers);

    const generator = new BasedOnWeightedHistoryDataGenerator(['2020', '2021']);
    generator.exporter = new CsvExporter({
        basePath: './dist/exports'
    })

    await calendar.simulate(generator);

    let results: {
        roster: Roster,
        avgScore: number
    }[] = [];

    for (let rosterBackupObject of rostersJSON.rosters) {
        const roster = Roster.fromBackupObject(rosterBackupObject);
        const avgScore = await calendar.getScore(roster) / numberOfWeekends;
        results.push({roster, avgScore})
    }

    results.sort((a, b) => a.avgScore - b.avgScore);
    const percentile = results.slice(Math.floor(results.length) * 0.99, results.length - 1)

    for (let bestRoster of percentile) {
        console.log(
            bestRoster.roster.drivers.map((driver) => driver.lastName),
            bestRoster.roster.team.name,
            bestRoster.roster.turboDriver.lastName,
            bestRoster.avgScore);
    }
    console.log(percentile.length)
}
getData()
