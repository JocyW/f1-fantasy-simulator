export default function* countGenerator(): Generator<any> {
    let i = 0;
    while (true) {
        yield ++i;
    }
}
