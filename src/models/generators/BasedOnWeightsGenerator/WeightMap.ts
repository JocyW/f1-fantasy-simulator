import Driver from "../../roster/Driver";
import Team from "../../roster/Team";

export default class WeightMap {
    public weight: number
    public cumulativeWeight: number;
    public driver: Driver
    public team: Team

    constructor(props: { weight: number, team: Team })
    constructor(props: { weight: number, driver: Driver })
    constructor(props: { weight: number, driver?: Driver, team?: Team }) {
        this.weight = props.weight;
        this.driver = props.driver;
        this.team = props.team;
    }

}
