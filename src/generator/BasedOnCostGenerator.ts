import FinishGenerator from "./FinishGenerator";
import Result from "../race/Result";
import WithLogger from "../logging/WithLogger";
import Logger from "../logging/Logger";
import WeekendObject from "../race/weekend_object/WeekendObject";
import Driver from "../roster/Driver";
import BasedOnWeightsGeneratorV1 from "./BasedOnWeightsGenerator/BasedOnWeightsGeneratorV1";
import WeightMap from "./BasedOnWeightsGenerator/WeightMap";

export default class BasedOnCostGenerator implements FinishGenerator, WithLogger {
    public logger: Logger;
    private generatorMap: WeakMap<Driver[], BasedOnWeightsGeneratorV1> = new WeakMap()

    constructor() {
        this.logger = new Logger('BasedOnCostGenerator')
    }

    async generate(weekendObject: WeekendObject): Promise<Result[]> {
        this.logger.debug('Generating results');
        const generator = this.generatorMap.get(weekendObject.drivers);
        if (generator) {
            return await generator.generate(weekendObject)
        } else {
            const weightMap = weekendObject.drivers.map((driver) => {
                return new WeightMap({
                    driver: driver,
                    weight: driver.cost
                });
            });
            this.generatorMap.set(weekendObject.drivers, new BasedOnWeightsGeneratorV1(weightMap))
        }
    }
}
