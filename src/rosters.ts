import Roster from "./models/roster/Roster";
import {drivers, teams} from "./generate";

const roster = new Roster();
roster.drivers = [drivers.norris,drivers.hamilton,drivers.ocon,drivers.gasly,drivers.perez];
roster.team = teams.alpha;

export default [
    roster
]
