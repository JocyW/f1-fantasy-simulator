import HasCost from "../higher/HasCost";

export default class Team extends HasCost {
    name: string;

    constructor(props: { cost: number, name: string,id: number }) {
        super({...props, id: props.id});
        this.name = props.name;
    }
}
