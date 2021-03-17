import {drivers} from "../../../generate";

const HISTORY_IDS = {
    albon: 848,
    grosjean: 154,
    magnussen: 825,
    kvyat: 826
}

export const historyDataMapping = {
    [drivers.hamilton.id]: 1,
    [drivers.verstappen.id]: [50,830],
    [drivers.bottas.id]: 822,
    [drivers.perez.id]: [815,807],
    [drivers.ricciardo.id]: 817,
    [drivers.vettel.id]: 20,
    [drivers.leclerc.id]: 277,
    [drivers.alonso.id]: 4,
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
