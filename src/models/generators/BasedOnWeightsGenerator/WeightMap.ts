import Driver from "../../roster/Driver";

export default class WeightMap {
    public weight: number
    public cumulativeWeight: number;
    public driver: Driver

    constructor(props: { weight: number, driver: Driver }) {
        this.weight = props.weight;
        this.driver = props.driver;
    }

}
