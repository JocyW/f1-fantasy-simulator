import {driversObj} from "../../fantasy";

export const CSV_DRIVER_IDS = {
    hamilton: '1',
    verstappen_1: '50',
    verstappen_2: '830',
    bottas: '822',
    sainz: '832',
    perez: '815',
    leclerc: '844',
    ricciardo: '817',
    vettel: '20',
    stroll: '840',
    norris: '846',
    gasly: '842',
    ocon: '839',
    raikkoenen: '8',
    giocinazzi: '841',
    latifi: '849',
    russel: '847',

    hulkenberg: '807',
    albon: '848',
    grosjean: '154',
    magnussen: '825',
    kvyat: '826',
    aitkin: '851',
    fittipaldi: '850',
    alonso: '4',
    tsunoda: '852',
    schumacher: '854',
    mazepin: '853'
}

export const season2020To2021Mapping = {
    [CSV_DRIVER_IDS.hamilton]: driversObj.hamilton.id,
    [CSV_DRIVER_IDS.verstappen_1]: driversObj.verstappen.id,
    [CSV_DRIVER_IDS.verstappen_2]: driversObj.verstappen.id,
    [CSV_DRIVER_IDS.bottas]: driversObj.bottas.id,
    [CSV_DRIVER_IDS.albon]: driversObj.perez.id,
    [CSV_DRIVER_IDS.sainz]: driversObj.ricciardo.id,
    [CSV_DRIVER_IDS.perez]: driversObj.vettel.id,
    [CSV_DRIVER_IDS.leclerc]: driversObj.leclerc.id,
    [CSV_DRIVER_IDS.ricciardo]: driversObj.alonso.id,
    [CSV_DRIVER_IDS.vettel]: driversObj.sainz.id,
    [CSV_DRIVER_IDS.stroll]: driversObj.stroll.id,
    [CSV_DRIVER_IDS.norris]: driversObj.norris.id,
    [CSV_DRIVER_IDS.gasly]: driversObj.gasly.id,
    [CSV_DRIVER_IDS.ocon]: driversObj.ocon.id,
    [CSV_DRIVER_IDS.raikkoenen]: driversObj.raikkoenen.id,
    [CSV_DRIVER_IDS.kvyat]: driversObj.tsunoda.id,
    [CSV_DRIVER_IDS.giocinazzi]: driversObj.giovinazzi.id,
    [CSV_DRIVER_IDS.latifi]: driversObj.latifi.id,
    [CSV_DRIVER_IDS.russel]: driversObj.russel.id,
    [CSV_DRIVER_IDS.magnussen]: driversObj.schumacher.id,
    [CSV_DRIVER_IDS.grosjean]: driversObj.mazepin.id,

    [CSV_DRIVER_IDS.fittipaldi]: driversObj.mazepin.id,
    [CSV_DRIVER_IDS.aitkin]: driversObj.russel.id,
    [CSV_DRIVER_IDS.hulkenberg]: driversObj.stroll.id
}

export const season2021To2021Mapping = {
    [CSV_DRIVER_IDS.hamilton]: driversObj.hamilton.id,
    [CSV_DRIVER_IDS.verstappen_1]: driversObj.verstappen.id,
    [CSV_DRIVER_IDS.verstappen_2]: driversObj.verstappen.id,
    [CSV_DRIVER_IDS.bottas]: driversObj.bottas.id,
    [CSV_DRIVER_IDS.perez]: driversObj.perez.id,
    [CSV_DRIVER_IDS.ricciardo]: driversObj.ricciardo.id,
    [CSV_DRIVER_IDS.vettel]: driversObj.vettel.id,
    [CSV_DRIVER_IDS.leclerc]: driversObj.leclerc.id,
    [CSV_DRIVER_IDS.alonso]: driversObj.alonso.id,
    [CSV_DRIVER_IDS.sainz]: driversObj.sainz.id,
    [CSV_DRIVER_IDS.stroll]: driversObj.stroll.id,
    [CSV_DRIVER_IDS.norris]: driversObj.norris.id,
    [CSV_DRIVER_IDS.gasly]: driversObj.gasly.id,
    [CSV_DRIVER_IDS.ocon]: driversObj.ocon.id,
    [CSV_DRIVER_IDS.raikkoenen]: driversObj.raikkoenen.id,
    [CSV_DRIVER_IDS.tsunoda]: driversObj.tsunoda.id,
    [CSV_DRIVER_IDS.giocinazzi]: driversObj.giovinazzi.id,
    [CSV_DRIVER_IDS.latifi]: driversObj.latifi.id,
    [CSV_DRIVER_IDS.russel]: driversObj.russel.id,
    [CSV_DRIVER_IDS.schumacher]: driversObj.schumacher.id,
    [CSV_DRIVER_IDS.mazepin]: driversObj.mazepin.id,
};
export const drivers = {
    ['2020']: season2020To2021Mapping,
    ['2021']: season2021To2021Mapping
}
