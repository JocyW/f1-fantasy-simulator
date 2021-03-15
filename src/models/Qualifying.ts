import Driver from "./Driver";
import Team from "./Team";
import BasedOnCostGenerator from "./generators/BasedOnCostGenerator";
import WeekendObject from "./WeekendObject";

export default class Qualifying extends WeekendObject{
    constructor() {
        super();
    }

    simulate(): void {
        this.results = new BasedOnCostGenerator().generate(this);

        console.log('Qualifying simulation done...');
        for (let result of this.results) {
            console.log(`${result.place}. - ${result.driver.firstName} ${result.driver.lastName}`)
        }
    }

    getDriverScore(driver: Driver, forTeam = false): number {
        if (!this.results.length) {
            throw Error('Simulate must be called first')
        }

        let score = 1;
        const result = this.results.find((res) => res.driver.id === driver.id);

        // Q2 Finish
        if (result.place <= 15) {
            score += 2;
        }
        // Q3 Finish
        if (result.place <= 10) {
            score += 3;
        }

        // Top 10 points
        if (result.place <= 10) {
            score += 11 - result.place;
        }

        // Better than teammate
        if (result.place < this.results.find((res) => res.driver.id === driver.id && res.driver.team.id === driver.team.id).place && !forTeam) {
            score += 2
        }

        //TODO: did not qualify
        //TODO: Disqualification

        return score;
    }

    getTeamScore(team: Team): number {
        if (!this.results.length) {
            throw Error('Simulate must be called first')
        }

        let score;
        const drivers = this.results.map((res) => res.driver.team.id === team.id ? res.driver : undefined);

        for (let driver of drivers) {
            if (driver) {
                score = this.getDriverScore(driver, true);
            }
        }
        return score;
    }
}
