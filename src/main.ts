import {drivers, teams} from "./generate";
import Roaster from "./models/Roaster";
import Weekend from "./models/Weekend";

const roaster = new Roaster();
roaster.drivers = [drivers.verstappen,drivers.schumacher,drivers.latifi,drivers.norris,drivers.gasly];
roaster.team = teams.mercedes;

const weekend = new Weekend();
weekend.drivers = Object.values(drivers);
weekend.simulate();
console.log(weekend.getScore(roaster));
