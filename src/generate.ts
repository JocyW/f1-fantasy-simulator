import Team from "./roster/Team";
import Driver from "./roster/Driver";

export const teams = {
    'mercedes': new Team({name: 'Mercedes', cost: 37.4, id: 127}),
    'redbull': new Team({name: 'Red Bull', cost: 26.0, id: 3}),
    'mclaren': new Team({name: 'McLaren', cost: 18.7, id: 5}),
    'ferrari': new Team({name: 'Ferrari', cost: 19.7, id: 7}),
    'aston': new Team({name: 'Aston Martin', cost: 16.4, id: 11}),
    'alpine': new Team({name: 'Alpine', cost: 15.2, id: 13}),
    'alpha': new Team({name: 'Alpha Tauri', cost: 12.6, id: 17}),
    'alfa': new Team({name: 'Alfa Romeo', cost: 9.2, id: 19}),
    'williams': new Team({name: 'Williams', cost: 6.3, id: 23}),
    'haas': new Team({name: 'Haas', cost: 6.1, id: 29})
};

export const driversObj = {
    'hamilton': new Driver({firstName: 'Lewis', lastName: 'Hamilton', team: teams.mercedes, cost: 33.3, id: 31}),
    'verstappen': new Driver({firstName: 'Max', lastName: 'Verstappen', team: teams.redbull, cost: 25.4, id: 37}),
    'bottas': new Driver({firstName: '', lastName: 'Bottas', team: teams.mercedes, cost: 23.1, id: 41}),
    'perez': new Driver({firstName: '', lastName: 'Perez', team: teams.redbull, cost: 18.0, id: 43}),
    'ricciardo': new Driver({firstName: '', lastName: 'Ricciardo', team: teams.mclaren, cost: 18.3, id: 47}),
    'vettel': new Driver({firstName: '', lastName: 'Vettel', team: teams.aston, cost: 14.9, id: 53}),
    'leclerc': new Driver({firstName: '', lastName: 'Leclerc', team: teams.ferrari, cost: 16.8, id: 59}),
    'alonso': new Driver({firstName: '', lastName: 'Alonso', team: teams.alpine, cost: 14.8, id: 61}),
    'sainz': new Driver({firstName: '', lastName: 'Sainz', team: teams.ferrari, cost: 14.7, id: 67}),
    'stroll': new Driver({firstName: '', lastName: 'Stroll', team: teams.aston, cost: 13.4, id: 71}),
    'norris': new Driver({firstName: '', lastName: 'Norris', team: teams.mclaren, cost: 13.9, id: 73}),
    'gasly': new Driver({firstName: '', lastName: 'Gasly', team: teams.alpha, cost: 11.5, id: 79}),
    'ocon': new Driver({firstName: '', lastName: 'Ocon', team: teams.alpine, cost: 10.5, id: 83}),
    'raikkoenen': new Driver({firstName: '', lastName: 'Raikoennen', team: teams.alfa, cost: 9.4, id: 89}),
    'tsunoda': new Driver({firstName: '', lastName: 'Tsunoda', team: teams.alpha, cost: 8.5, id: 97}),
    'giovinazzi': new Driver({firstName: '', lastName: 'Giovinazzi', team: teams.alfa, cost: 7.9, id: 101}),
    'latifi': new Driver({firstName: '', lastName: 'Latifi', team: teams.williams, cost: 6.4, id: 103}),
    'russel': new Driver({firstName: '', lastName: 'Russel', team: teams.williams, cost: 6.2, id: 107}),
    'schumacher': new Driver({firstName: 'Mick', lastName: 'Schumacher', team: teams.haas, cost: 5.8, id: 109}),
    'mazepin': new Driver({firstName: '', lastName: 'Mazepin', team: teams.haas, cost: 5.3, id: 113}),
};

export default {teams, drivers: driversObj};
