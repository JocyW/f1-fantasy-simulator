import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import Calendar from "./models/races/Calendar";
import BasedOnWeightedHistoryDataGenerator from "./models/generators/BasedOnWeightedHistoryDataGenerator";
import {jocysLeague} from "./rosters";
import CsvExporter from "./models/exporter/CsvExporter";

export const DEBUG_ENABLED = false;


function* fileName() {
    let i = 0;
    while(true){
        yield `weekendObject-${++i}`;
    }
}

const getData = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.exporter = new CsvExporter({
        basePath: './dist/exports/weekend_object',
        // @ts-ignore
        fileName: fileName()
    })
    calendar.drivers = Object.values(drivers);
    await calendar.simulate(new BasedOnWeightedHistoryDataGenerator(['2020', '2021']));

    const topRoster = new Roster();
    topRoster.drivers = [drivers.verstappen, drivers.ricciardo, drivers.tsunoda, drivers.mazepin, drivers.mazepin];
    topRoster.team = teams.mercedes;
    topRoster.turboDriver = drivers.ricciardo;

    jocysLeague.addEntry('Jocy', topRoster);

    jocysLeague.calendar = calendar;
    await jocysLeague.getScore(null);

}
getData()
