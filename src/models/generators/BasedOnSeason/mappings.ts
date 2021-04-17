import {drivers} from "../../../generate";

export const HISTORY_IDS = {
    albon: '848',
    grosjean: '154',
    magnussen: '825',
    kvyat: '826',
    aitkin: '851',
    fittipaldi: '850'
}

export const historyDataMapping = {
    [drivers.hamilton.id]: 1,
    [drivers.verstappen.id]: [50,830],
    [drivers.bottas.id]: 822,
    [drivers.perez.id]: [815,807],
    [drivers.ricciardo.id]: 817,
    [drivers.vettel.id]: 20,
    [drivers.leclerc.id]: 844,
    [drivers.sainz.id]: 832,
    [drivers.stroll.id]: 840,
    [drivers.norris.id]: 846,
    [drivers.gasly.id]: 842,
    [drivers.ocon.id]: 839,
    [drivers.raikkoenen.id]: 8,
    [drivers.tsunoda.id]: null,
    [drivers.giovinazzi.id]: 841,
    [drivers.latifi.id]: 849,
    [drivers.russel.id]: 847,
    [drivers.schumacher.id]: null,
    [drivers.mazepin.id]: null,
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

export const mappings = {
    ['2020']: season2020To2021Mapping
}

export const season2021To2020Mapping = {
    [drivers.hamilton.id]: historyDataMapping[drivers.hamilton.id],
    [drivers.verstappen.id]: historyDataMapping[drivers.verstappen.id],
    [drivers.bottas.id]: historyDataMapping[drivers.bottas.id],
    [drivers.perez.id]: HISTORY_IDS.albon,
    [drivers.ricciardo.id]: historyDataMapping[drivers.alonso.id],
    [drivers.vettel.id]: historyDataMapping[drivers.perez.id],
    [drivers.leclerc.id]: historyDataMapping[drivers.leclerc.id],
    [drivers.alonso.id]: historyDataMapping[drivers.ricciardo.id],
    [drivers.sainz.id]: historyDataMapping[drivers.vettel.id],
    [drivers.stroll.id]: historyDataMapping[drivers.stroll.id],
    [drivers.norris.id]: historyDataMapping[drivers.norris.id],
    [drivers.gasly.id]: historyDataMapping[drivers.gasly.id],
    [drivers.ocon.id]: historyDataMapping[drivers.ocon.id],
    [drivers.raikkoenen.id]: historyDataMapping[drivers.raikkoenen.id],
    [drivers.tsunoda.id]: HISTORY_IDS.kvyat,
    [drivers.giovinazzi.id]: historyDataMapping[drivers.giovinazzi.id],
    [drivers.latifi.id]: historyDataMapping[drivers.latifi.id],
    [drivers.russel.id]: historyDataMapping[drivers.russel.id],
    [drivers.schumacher.id]: HISTORY_IDS.magnussen,
    [drivers.mazepin.id]: HISTORY_IDS.grosjean,
}
