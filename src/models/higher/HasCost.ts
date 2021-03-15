import HasId from "./HasId";

export default class HasCost extends HasId{
    cost: number

    constructor(props: { cost: number, id: Symbol }) {
        super(props);
        this.cost = props.cost;
    }

}
