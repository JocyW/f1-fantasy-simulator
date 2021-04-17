import HasId from "./HasId";

export default abstract class HasCost extends HasId {
    cost: number

    constructor(props: { cost: number, id: number }) {
        super(props);
        this.cost = props.cost;
    }

}
