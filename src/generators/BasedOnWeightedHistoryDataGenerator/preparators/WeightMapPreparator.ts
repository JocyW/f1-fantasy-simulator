import Driver from "../../../roster/Driver";

export default interface WeightMapPreparator {

    prepare(drivers: Driver[]): Promise<void>
}
