import Exportable from "./interface/Exportable";

export default abstract class Exporter {
    abstract export(exportable: Exportable)
}
