import FinishGenerator from "../../interfaces/FinishGenerator";
import Finishable from "../higher/Finishable";
import Result from "../Result";

export default class BasedOnCostGenerator implements FinishGenerator{
    generate(finishable: Finishable): Result[] {
        let driverArray = [...finishable.drivers]
        let placeCounter = 1;
        const res = [];

        do {
            let costSum = 0;
            const accArray = [];
            for (let driver of driverArray){
                costSum += driver.cost;
                accArray.push(driver.cost + (accArray.length ? accArray[accArray.length - 1] : 0))
            }

            const rand = Math.random() * costSum;

            let index = accArray.findIndex((n) => rand <= n);

            res.push(new Result({
                place: placeCounter,
                driver: driverArray[index]
            }));

            driverArray.splice(index, 1);
            placeCounter++;
        } while (driverArray.length > 0)

        return res;
    }

}
