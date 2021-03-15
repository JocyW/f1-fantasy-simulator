export default class HasId{
    id: Symbol;

    constructor(props: {id: Symbol}) {
        this.id = props.id;
    }
}
