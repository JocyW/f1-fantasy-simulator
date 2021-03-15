import FinishGenerator from "./FinishGenerator";

export default interface Simulateable{
    simulate(generator: FinishGenerator): void
}
