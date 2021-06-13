import {drivers} from './drivers';

export const mapDriverId = (driverId: string, season: string): number => {
    if (!drivers[season]) {
        throw Error(`SeasonMapping: season ${season} is not supported`);
    }

    const mapping = drivers[season];
    const driver = mapping[driverId];


    if (!driver) {
        throw Error(`Could not find 2021 driver for ${driverId}`)
    }

    return driver;
}

