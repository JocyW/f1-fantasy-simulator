type Clazz = {
    new(...args: any[]): any
}


export default <T>(clazz: T) => {
    return () => {
        // @ts-ignore
        if (!clazz.instance) {
            // @ts-ignore
            return clazz.instance = new clazz();
        }
        // @ts-ignore
        return clazz.instance;
    }
}
