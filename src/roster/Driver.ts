import HasCost from "./interface/HasCost";
import Team from "./Team";

export default class Driver extends HasCost {
    team: Team;
    firstName: string;
    lastName: string;

    constructor(props: { cost: number, firstName: string, lastName: string, team: Team, id: number }) {
        super({...props, id: props.id});
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.team = props.team;
    }

    static findById(drivers: Driver[], driverId: number) {
        //TODO: convert to O(1)
        return drivers.find((driver) => driver.id === driverId)
    }

    static findTeamById(drivers: Driver[], teamId: number): Team {
        return drivers.find((driver) => driver.team.id === teamId)?.team
    }
}
