import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import Weekend from "./models/races/Weekend";

const roster = new Roster();
roster.drivers = [drivers.verstappen,drivers.schumacher,drivers.latifi,drivers.norris,drivers.gasly];
roster.team = teams.mercedes;

const weekend = new Weekend();
weekend.drivers = Object.values(drivers);
weekend.simulate();
console.log(weekend.getScore(roster));
