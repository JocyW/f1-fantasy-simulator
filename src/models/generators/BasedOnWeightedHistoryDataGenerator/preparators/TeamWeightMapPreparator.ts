import HistoryWeightMapPreparator from "./HistoryWeightMapPreparator";
import Driver from "../../../roster/Driver";
import SUPPORTED_CLASSES from "../../../races/supportedWeekendObjects";
import BasedOnWeightedHistoryDataGenerator from "../BasedOnWeightedHistoryDataGenerator";
import {ResultsTable} from "../../../data/csv/ResultsTable";
import Result from "../../../races/Result";
import WeightMap from "../../BasedOnWeightsGenerator/WeightMap";
import Team from "../../../roster/Team";
import {csvToLocalMapping} from "../../../data/csv/mappings/teams";

export default class TeamWeightMapPreparator extends HistoryWeightMapPreparator {

    constructor(historyDataGenerator: BasedOnWeightedHistoryDataGenerator) {
        super(historyDataGenerator);
    }

    getExportName(): string {
        return "TeamWeightMapPreparator";
    }

    getUniqueTeams(drivers: Driver[]): Team[] {
        return drivers.reduce((teams, driver) => {
            if (!teams.includes(driver.team)) {
                teams.push(driver.team)
            }
            return teams;
        }, []);
    }

    async prepare(drivers: Driver[]): Promise<void> {
        let weight = 1;

        const teams = this.getUniqueTeams(drivers);

        for (let seasonYear of this.historyGenerator.seasonYears) {
            this.logger.debug('seasonYear', seasonYear);
            for (let race of this.historyData.getRacesForSeason(seasonYear)) {
                this.logger.debug('race');

                for (let object of SUPPORTED_CLASSES) {
                    this.logger.debug('object', object);
                    let weightMap = this.weights.get(object);

                    let results = this.historyData.getResultsForWeekendObject(object, race)

                    let teamPositions = new Map();

                    for (let team of teams) {
                        teamPositions.set(team, []);
                    }

                    for (let result of results) {
                        const team = Driver.findTeamById(drivers, csvToLocalMapping[result.constructorId])
                        if (team) {
                            let position;
                            if (result.position === ResultsTable.POSITION_NOT_FINISHED) {
                                position = Result.PLACE_DNF;
                            } else {
                                position = parseInt(result.position, 10)
                            }

                            teamPositions.get(team).push(position);
                        }
                    }

                    for (let [team, positions] of teamPositions.entries()) {
                        if (positions.length > 0) {
                            for (let position of positions) {
                                await this.updateWithNewWeight(team, weightMap, position, weight)
                            }
                        }
                    }
                }
                weight *= BasedOnWeightedHistoryDataGenerator.raceMultiplier
            }
            weight *= BasedOnWeightedHistoryDataGenerator.seasonMultiplier
        }

    }

    async updateWithNewWeight(team: Team, map: WeightMap[], result: number, weight: number) {
        if (result === Result.PLACE_DNF) {
            result = 20;
        }
        const currentMapping = map.find((mapping) => mapping.team === team);

        if (currentMapping) {
            let position = 1;
            for (let weightMapping of map) {
                if (weightMapping.weight >= currentMapping.weight) {
                    position++;
                }
            }

            const correction = (position - result / 2) * BasedOnWeightedHistoryDataGenerator.baseChange * weight;

            this.logger.debug(`Expected position ${position} found ${result} correcting ${correction}`)

            currentMapping.weight += correction;
            if (currentMapping.weight < 1) {
                currentMapping.weight = 1;
            }
        } else {
            map.push(new WeightMap({team, weight: BasedOnWeightedHistoryDataGenerator.baseWeight}))
        }
        this.logger.debug('updateWithNewWeight', map);
    }

}
