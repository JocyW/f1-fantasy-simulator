import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import Calendar from "./models/races/Calendar";
import rostersJSON from "../assets/brute_force.json";
import BasedOnWeightedHistoryDataGenerator from "./models/generators/BasedOnWeightedHistoryDataGenerator";

export const DEBUG_ENABLED = false;

const getData = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.drivers = Object.values(drivers);
    await calendar.simulate(new BasedOnWeightedHistoryDataGenerator(['2020','2021']));

    const topRoster = new Roster();
    topRoster.drivers = [drivers.verstappen, drivers.ricciardo, drivers.tsunoda, drivers.mazepin, drivers.mazepin];
    topRoster.team = teams.mercedes;
    topRoster.turboDriver = drivers.ricciardo;

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

    const topRosterScore = await calendar.getScore(topRoster) / numberOfWeekends;

    for (let bestRoster of percentile) {
        console.log(
            bestRoster.roster.drivers.map((driver) => driver.lastName),
            bestRoster.roster.team.name,
            bestRoster.roster.turboDriver.lastName,
            bestRoster.avgScore);
    }
    console.log(percentile.length)
    console.log(topRosterScore);
}
getData()
