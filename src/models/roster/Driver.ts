import HasCost from "../higher/HasCost";
import Team from "./Team";

export default class Driver extends HasCost {
    team: Team;
    firstName: string;
    lastName: string;

    constructor(props: { cost: number, firstName: string, lastName: string, team: Team }) {
        super({...props,id: Symbol(props.lastName)});
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.team = props.team;
        this.id = Symbol(this.lastName);
    }
}
