import FinishGenerator from "../../generator/FinishGenerator";

export default interface Simulateable {
    simulate(generator: FinishGenerator): void
}
