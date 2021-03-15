import Roster from "./models/roster/Roster";
import {drivers, teams} from "./generate";

/*
 * ===========================================
 *          THIS FILE IS GIT-IGNORED
 * ===========================================
 */

const roster1 = new Roster();
roster1.drivers = [drivers.verstappen,drivers.schumacher,drivers.latifi,drivers.norris,drivers.gasly];
roster1.team = teams.mercedes;


export default [
    roster1
]

