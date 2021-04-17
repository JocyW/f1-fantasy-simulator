import {drivers} from "./generate";
import Roster from "./models/roster/Roster";
import Calendar from "./models/races/Calendar";
import rostersJSON from "../assets/brute_force.json";
import BasedOnSeasonGenerator from "./models/generators/BasedOnSeason/BasedOnSeasonGenerator";

export const DEBUG_ENABLED = false;

const getData = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.drivers = Object.values(drivers);
    await calendar.simulate(new BasedOnSeasonGenerator('2020'));

    let bestRosters: {
        roster: Roster,
        avgScore: number
    }[] = [];

    for (let rosterBackupObject of rostersJSON.rosters) {
        const roster = Roster.fromBackupObject(rosterBackupObject);
        const avgScore = await calendar.getScore(roster) / numberOfWeekends;

        if (avgScore > 400) {
            bestRosters.push({
                roster,
                avgScore
            })
        }
    }

    for (let bestRoster of bestRosters) {
        console.log(
            bestRoster.roster.drivers.map((driver) => driver.lastName),
            bestRoster.roster.team.name,
            bestRoster.roster.turboDriver.lastName,
            bestRoster.avgScore);
    }
    console.log(bestRosters.length)
}
getData()
