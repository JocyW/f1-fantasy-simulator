import FinishGenerator from "../../interfaces/FinishGenerator";
import HasResults from "../higher/HasResults";
import Result from "../weekend/Result";

export default class BasedOnCostGenerator implements FinishGenerator{
    generate(finishable: HasResults): Result[] {
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
