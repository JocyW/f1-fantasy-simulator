import {drivers} from "../../../../generate";

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

const season2020To2021Mapping = {
    [CSV_DRIVER_IDS.hamilton]: drivers.hamilton.id,
    [CSV_DRIVER_IDS.verstappen_1]: drivers.verstappen.id,
    [CSV_DRIVER_IDS.verstappen_2]: drivers.verstappen.id,
    [CSV_DRIVER_IDS.bottas]: drivers.bottas.id,
    [CSV_DRIVER_IDS.albon]: drivers.perez.id,
    [CSV_DRIVER_IDS.sainz]: drivers.ricciardo.id,
    [CSV_DRIVER_IDS.perez]: drivers.vettel.id,
    [CSV_DRIVER_IDS.leclerc]: drivers.leclerc.id,
    [CSV_DRIVER_IDS.ricciardo]: drivers.alonso.id,
    [CSV_DRIVER_IDS.vettel]: drivers.sainz.id,
    [CSV_DRIVER_IDS.stroll]: drivers.stroll.id,
    [CSV_DRIVER_IDS.norris]: drivers.norris.id,
    [CSV_DRIVER_IDS.gasly]: drivers.gasly.id,
    [CSV_DRIVER_IDS.ocon]: drivers.ocon.id,
    [CSV_DRIVER_IDS.raikkoenen]: drivers.raikkoenen.id,
    [CSV_DRIVER_IDS.kvyat]: drivers.tsunoda.id,
    [CSV_DRIVER_IDS.giocinazzi]: drivers.giovinazzi.id,
    [CSV_DRIVER_IDS.latifi]: drivers.latifi.id,
    [CSV_DRIVER_IDS.russel]: drivers.russel.id,
    [CSV_DRIVER_IDS.magnussen]: drivers.schumacher.id,
    [CSV_DRIVER_IDS.grosjean]: drivers.mazepin.id,

    [CSV_DRIVER_IDS.fittipaldi]: drivers.mazepin.id,
    [CSV_DRIVER_IDS.aitkin]: drivers.russel.id,
    [CSV_DRIVER_IDS.hulkenberg]: drivers.stroll.id
}

const season2021To2021Mapping = {
    [CSV_DRIVER_IDS.hamilton]: drivers.hamilton.id,
    [CSV_DRIVER_IDS.verstappen_1]: drivers.verstappen.id,
    [CSV_DRIVER_IDS.verstappen_2]: drivers.verstappen.id,
    [CSV_DRIVER_IDS.bottas]: drivers.bottas.id,
    [CSV_DRIVER_IDS.perez]: drivers.perez.id,
    [CSV_DRIVER_IDS.ricciardo]: drivers.ricciardo.id,
    [CSV_DRIVER_IDS.vettel]: drivers.vettel.id,
    [CSV_DRIVER_IDS.leclerc]: drivers.leclerc.id,
    [CSV_DRIVER_IDS.alonso]: drivers.alonso.id,
    [CSV_DRIVER_IDS.sainz]: drivers.sainz.id,
    [CSV_DRIVER_IDS.stroll]: drivers.stroll.id,
    [CSV_DRIVER_IDS.norris]: drivers.norris.id,
    [CSV_DRIVER_IDS.gasly]: drivers.gasly.id,
    [CSV_DRIVER_IDS.ocon]: drivers.ocon.id,
    [CSV_DRIVER_IDS.raikkoenen]: drivers.raikkoenen.id,
    [CSV_DRIVER_IDS.tsunoda]: drivers.tsunoda.id,
    [CSV_DRIVER_IDS.giocinazzi]: drivers.giovinazzi.id,
    [CSV_DRIVER_IDS.latifi]: drivers.latifi.id,
    [CSV_DRIVER_IDS.russel]: drivers.russel.id,
    [CSV_DRIVER_IDS.schumacher]: drivers.schumacher.id,
    [CSV_DRIVER_IDS.mazepin]: drivers.mazepin.id,
};
export const data = {
    ['2020']: season2020To2021Mapping,
    ['2021']: season2021To2021Mapping
}
