import HasCost from "./interface/HasCost";
import Driver from "./Driver";

export default class Team extends HasCost {
    name: string;

    constructor(props: { cost: number, name: string, id: number }) {
        super({...props, id: props.id});
        this.name = props.name;
    }

    static getUniqueTeams(drivers: Driver[]): Team[] {
        return drivers.reduce((teams, driver) => {
            if (!teams.includes(driver.team)) {
                teams.push(driver.team)
            }
            return teams;
        }, [])
    }
}
