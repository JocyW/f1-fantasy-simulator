import {drivers} from "./generate";
import Roster from "./models/roster/Roster";
import BasedOnCostGenerator from "./models/generators/BasedOnCostGenerator";
import Calendar from "./models/races/Calendar";
import rostersJSON from "../assets/brute_force.json";

export const DEBUG_ENABLED = false;


const numberOfWeekends = 1000;

const calendar = new Calendar(numberOfWeekends);
calendar.drivers = Object.values(drivers);
calendar.simulate(new BasedOnCostGenerator());

let bestRosters: {
    roster: Roster,
    avgScore: number
}[] = [];

for (let rosterBackupObject of rostersJSON.rosters) {
    const roster = Roster.fromBackupObject(rosterBackupObject);
    const avgScore = calendar.getScore(roster) / numberOfWeekends;

    if (avgScore > 360.85) {
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



