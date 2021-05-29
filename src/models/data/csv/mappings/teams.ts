import {teams} from "../../../../generate";

export const CSV_TEAM_IDS = {
    'mercedes': '131',
    'redbull': '9',
    'mclaren': '1',
    'ferrari': '6',
    'aston': '117',
    'alpine': '214',
    'alpha': '213',
    'alfa': '51',
    'williams': '3',
    'haas': '210'
}

export const csvToLocalMapping = {
    [CSV_TEAM_IDS.mercedes]: teams.mercedes.id,
    [CSV_TEAM_IDS.redbull]: teams.redbull.id,
    [CSV_TEAM_IDS.mclaren]: teams.mclaren.id,
    [CSV_TEAM_IDS.ferrari]: teams.ferrari.id,
    [CSV_TEAM_IDS.aston]: teams.aston.id,
    [CSV_TEAM_IDS.alpine]: teams.alpine.id,
    [CSV_TEAM_IDS.alpha]: teams.alpha.id,
    [CSV_TEAM_IDS.alfa]: teams.alfa.id,
    [CSV_TEAM_IDS.williams]: teams.williams.id,
    [CSV_TEAM_IDS.haas]: teams.haas.id,
}
