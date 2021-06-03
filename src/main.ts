import {driversObj, teams} from "./generate";
import Roster from "./models/roster/Roster";
import Calendar from "./models/races/Calendar";
import BasedOnWeightedHistoryDataGenerator
    from "./models/generators/BasedOnWeightedHistoryDataGenerator/BasedOnWeightedHistoryDataGenerator";
import {generateBruteForceJson, jocysLeague} from "./rosters";
import CsvExporter from "./models/exporter/CsvExporter";
import HistoricalDNFModifier from "./models/generators/modifier/HistoricalDNFModifier";
import bruteForced from '../assets/brute_force.json';

export const DEBUG_ENABLED = false;

const getCalendar = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.exporter = new CsvExporter({
        basePath: './dist/exports/weekend_object',
    })
    calendar.drivers = Object.values(driversObj);

    const years = ['2016', '2017', '2018', '2019', '2020', '2021'];

    const gen = new BasedOnWeightedHistoryDataGenerator(years);
    gen.exporter = new CsvExporter({
        basePath: './dist/exports'
    })

    const generator = new HistoricalDNFModifier(gen, years);
    generator.exporter = new CsvExporter({
        basePath: './dist/exports'
    })

    await calendar.simulate(generator);

    return calendar;
}

const generateBruteForcedResults = async () => {
    const calendar = await getCalendar();

    const scoreMap = new Map();
    let topScore = 0;
    let i = 1;

    const rosters = bruteForced.rosters.map((rosterJSON) => Roster.fromBackupObject(rosterJSON))

    for (let roster of rosters) {
        const score = await calendar.getScore(roster);
        scoreMap.set(roster, score)
        if (score > topScore) {
            topScore = score
        }
        console.log(`getting score for roster ${i++}`)
    }

    for (let roster of rosters) {
        const score = scoreMap.get(roster);
        if (score > topScore * 0.98) {
            console.log(...roster.drivers.map((driver) => driver.lastName), roster.team.name, roster.turboDriver.lastName, score)
        }
    }


    const topRoster = new Roster();
    topRoster.drivers = [driversObj.verstappen, driversObj.ricciardo, driversObj.tsunoda, driversObj.mazepin, driversObj.mazepin];
    topRoster.team = teams.mercedes;
    topRoster.turboDriver = driversObj.ricciardo;

    const newTopRoster = new Roster();
    newTopRoster.drivers = [driversObj.verstappen,driversObj.norris,driversObj.ocon,driversObj.giovinazzi,driversObj.schumacher];
    newTopRoster.team = teams.mercedes;
    newTopRoster.turboDriver = driversObj.norris;

    jocysLeague.addEntry('Jocy', topRoster);
    jocysLeague.addEntry('JocyNew', newTopRoster);
    jocysLeague.exporter = new CsvExporter({
        basePath: './dist/exports',
    });

    jocysLeague.calendar = calendar;
    await jocysLeague.getScore(null);
}

const generateLeagueResults = async () => {

    const calendar = await getCalendar();

    const topRoster = new Roster();
    topRoster.drivers = [driversObj.verstappen, driversObj.ricciardo, driversObj.tsunoda, driversObj.mazepin, driversObj.mazepin];
    topRoster.team = teams.mercedes;
    topRoster.turboDriver = driversObj.ricciardo;

    const newTopRoster = new Roster();
    newTopRoster.drivers = [driversObj.verstappen,driversObj.norris,driversObj.ocon,driversObj.giovinazzi,driversObj.schumacher];
    newTopRoster.team = teams.mercedes;
    newTopRoster.turboDriver = driversObj.norris;

    jocysLeague.addEntry('Jocy', topRoster);
    jocysLeague.addEntry('JocyNew', newTopRoster);
    jocysLeague.exporter = new CsvExporter({
        basePath: './dist/exports',
    });

    jocysLeague.calendar = calendar;
    await jocysLeague.getScore(null);

}
generateBruteForcedResults()
