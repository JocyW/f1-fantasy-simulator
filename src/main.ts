import {driversObj, teams} from "./data/fantasy";
import Roster from "./roster/Roster";
import Calendar from "./race/Calendar";
import BasedOnWeightedHistoryDataGenerator
    from "./generator/BasedOnWeightedHistoryDataGenerator/BasedOnWeightedHistoryDataGenerator";
import {jocysLeague} from "./rosters";
import CsvExporter from "./exporter/CsvExporter";
import HistoricalDNFModifier from "./generator/modifier/HistoricalDNFModifier";
import bruteForced from '../assets/brute_force.json';
import BasedOnWeightsGeneratorV2 from "./generator/BasedOnWeightsGenerator/BasedOnWeightsGeneratorV2";

const getCalendar = async () => {
    const numberOfWeekends = 1000;

    const calendar = new Calendar(numberOfWeekends);
    calendar.exporter = new CsvExporter({
        basePath: './dist/exports/weekend_object',
    })
    calendar.drivers = Object.values(driversObj);

    const years = ['2018', '2019', '2020', '2021'];

    const gen = new BasedOnWeightedHistoryDataGenerator(years, BasedOnWeightsGeneratorV2);
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
        console.log(`getting score for roster ${i++} of ${rosters.length}`)
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
    newTopRoster.drivers = [driversObj.verstappen, driversObj.norris, driversObj.ocon, driversObj.giovinazzi, driversObj.schumacher];
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
    newTopRoster.drivers = [driversObj.verstappen, driversObj.norris, driversObj.ocon, driversObj.giovinazzi, driversObj.schumacher];
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
