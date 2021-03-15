import HasCost from "./higher/HasCost";

export default class Team extends HasCost {
    name: string;

    constructor(props: { cost: number, name: string }) {
        super({...props, id: Symbol(props.name)});
        this.name = props.name;
    }
}
