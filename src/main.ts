import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import BasedOnCostGenerator from "./models/generators/BasedOnCostGenerator";
import Calendar from "./models/races/Calendar";

export const DEBUG_ENABLED = false;

const roster1 = new Roster();
roster1.drivers = [drivers.verstappen,drivers.schumacher,drivers.latifi,drivers.norris,drivers.gasly];
roster1.team = teams.mercedes;

const roster2 = new Roster();
roster2.drivers = [drivers.norris,drivers.hamilton,drivers.ocon,drivers.gasly,drivers.perez];
roster2.team = teams.alpha;

const numberOfWeekends = 1000;

const calendar = new Calendar(numberOfWeekends);
calendar.drivers = Object.values(drivers);
calendar.simulate(new BasedOnCostGenerator());

console.log(calendar.getScore(roster1) / numberOfWeekends);
console.log(calendar.getScore(roster2) / numberOfWeekends);




