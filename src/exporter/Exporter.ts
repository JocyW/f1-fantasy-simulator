import Exportable from "../Exportable";

export default abstract class Exporter {
    abstract export(exportable: Exportable)
}
