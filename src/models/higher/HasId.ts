export default abstract class HasId{
    id: number;

    constructor(props: {id: number}) {
        this.id = props.id;
    }
}
