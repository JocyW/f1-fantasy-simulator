import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import BasedOnCostGenerator from "./models/generators/BasedOnCostGenerator";
import Calendar from "./models/races/Calendar";
import rosters from "./rosters";

export const DEBUG_ENABLED = false;


const numberOfWeekends = 1000;

const calendar = new Calendar(numberOfWeekends);
calendar.drivers = Object.values(drivers);
calendar.simulate(new BasedOnCostGenerator());

for(let roster of rosters){
    console.log(calendar.getScore(roster));
}




