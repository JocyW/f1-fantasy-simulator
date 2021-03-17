type Clazz = {
    new(...args: any[]): any
}

interface Singletonable extends Clazz {
    instance: Clazz
}

export default (clazz: Singletonable) => {
    return () => {
        if (!clazz.instance) {
            return clazz.instance = new clazz();
        }
        return clazz.instance;
    }
}
