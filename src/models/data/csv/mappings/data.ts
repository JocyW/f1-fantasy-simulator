import {drivers} from "../../../../generate";

export const HISTORY_IDS = {
    albon: '848',
    grosjean: '154',
    magnussen: '825',
    kvyat: '826',
    aitkin: '851',
    fittipaldi: '850'
}

const season2020To2021Mapping = {
    ['1']: drivers.hamilton.id,
    ['50']: drivers.verstappen.id,
    ['830']: drivers.verstappen.id,
    ['822']: drivers.bottas.id,
    [HISTORY_IDS.albon]: drivers.perez.id,
    ['832']: drivers.ricciardo.id,
    ['815']: drivers.vettel.id,
    ['807']: drivers.stroll.id,
    ['844']: drivers.leclerc.id,
    ['817']: drivers.alonso.id,
    ['20']: drivers.sainz.id,
    ['840']: drivers.stroll.id,
    ['846']: drivers.norris.id,
    ['842']: drivers.gasly.id,
    ['839']: drivers.ocon.id,
    ['8']: drivers.raikkoenen.id,
    [HISTORY_IDS.kvyat]: drivers.tsunoda.id,
    ['841']: drivers.giovinazzi.id,
    '849': drivers.latifi.id,
    '847': drivers.russel.id,
    [HISTORY_IDS.magnussen]: drivers.schumacher.id,
    [HISTORY_IDS.grosjean]: drivers.mazepin.id,
    [HISTORY_IDS.fittipaldi]: drivers.mazepin.id,
    [HISTORY_IDS.aitkin]: drivers.russel.id
}

export const data = {
    ['2020']: season2020To2021Mapping
}
