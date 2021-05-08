import {drivers, teams} from "./generate";
import Roster from "./models/roster/Roster";
import Calendar from "./models/races/Calendar";
import BasedOnWeightedHistoryDataGenerator from "./models/generators/BasedOnWeightedHistoryDataGenerator";
import {jocysLeague} from "./rosters";
import CsvExporter from "./models/exporter/CsvExporter";
import HistoricalDNFModifier from "./models/generators/modifier/HistoricalDNFModifier";

export const DEBUG_ENABLED = false;

const getData = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.exporter = new CsvExporter({
        basePath: './dist/exports/weekend_object',
    })
    calendar.drivers = Object.values(drivers);

    const years = ['2018', '2019', '2020', '2021'];

    const generator = new HistoricalDNFModifier(new BasedOnWeightedHistoryDataGenerator(years), years);
    generator.exporter = new CsvExporter({
        basePath: './dist/exports'
    })

    await calendar.simulate(generator);

    const topRoster = new Roster();
    topRoster.drivers = [drivers.verstappen, drivers.ricciardo, drivers.tsunoda, drivers.mazepin, drivers.mazepin];
    topRoster.team = teams.mercedes;
    topRoster.turboDriver = drivers.ricciardo;

    jocysLeague.addEntry('Jocy', topRoster);
    jocysLeague.exporter = new CsvExporter({
        basePath: './dist/exports',
    });

    jocysLeague.calendar = calendar;
    await jocysLeague.getScore(null);

}
getData()
