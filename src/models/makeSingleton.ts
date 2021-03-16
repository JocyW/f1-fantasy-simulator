export default (clazz) => {
    return () => {
        if (!clazz.instance) {
            return clazz.instance = new clazz();
        }
        return clazz.instance;
    }
}
