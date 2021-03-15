export default abstract class HasId{
    id: Symbol;

    constructor(props: {id: Symbol}) {
        this.id = props.id;
    }
}
