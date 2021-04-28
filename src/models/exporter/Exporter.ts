import Exportable from "../../interfaces/Exportable";

export default abstract class Exporter {
    abstract export(exportable: Exportable)
}
