import Team from "./models/Team";
import Driver from "./models/Driver";

export const teams = {
    'mercedes': new Team({name: 'Mercedes', cost: 38}),
    'redbull': new Team({name: 'Red Bull', cost: 25.9}),
    'mclaren': new Team({name: 'McLaren', cost: 18.9}),
    'ferrari': new Team({name: 'Ferrari', cost: 18.1}),
    'aston': new Team({name: 'Aston Martin', cost: 17.6}),
    'alpine': new Team({name: 'Alpine', cost: 15.4}),
    'alpha': new Team({name: 'Alpha Tauri', cost: 12.7}),
    'alfa': new Team({name: 'Alfa Romeo', cost: 8.9}),
    'williams': new Team({name: 'Williams', cost: 6.3}),
    'haas': new Team({name: 'Haas', cost: 6.1})
};

export const drivers = {
    'hamilton': new Driver({firstName: 'Lewis', lastName: 'Hamilton', team: teams.mercedes, cost: 33.5}),
    'verstappen': new Driver({firstName: 'Max', lastName: 'Verstappen', team: teams.redbull, cost: 24.8}),
    'bottas': new Driver({firstName: '', lastName: 'Bottas', team: teams.mercedes, cost: 23.6}),
    'perez': new Driver({firstName: '', lastName: 'Perez', team: teams.redbull, cost: 18.4}),
    'ricciardo': new Driver({firstName: '', lastName: 'Ricciardo', team: teams.mclaren, cost: 17.3}),
    'vettel': new Driver({firstName: '', lastName: 'Vettel', team: teams.aston, cost: 16.2}),
    'leclerc': new Driver({firstName: '', lastName: 'Leclerc', team: teams.ferrari, cost: 16.8}),
    'alonso': new Driver({firstName: '', lastName: 'Alonso', team: teams.alpine, cost: 15.6}),
    'sainz': new Driver({firstName: '', lastName: 'Sainz', team: teams.ferrari, cost: 14.4}),
    'stroll': new Driver({firstName: '', lastName: 'Stroll', team: teams.aston, cost: 13.9}),
    'norris': new Driver({firstName: '', lastName: 'Norris', team: teams.mclaren, cost: 13.1}),
    'gasly': new Driver({firstName: '', lastName: 'Gasly', team: teams.alpha, cost: 11.7}),
    'ocon': new Driver({firstName: '', lastName: 'Ocon', team: teams.alpine, cost: 10.1}),
    'raikkoenen': new Driver({firstName: '', lastName: 'Raikoennen', team: teams.alfa, cost: 9.6}),
    'tsunoda': new Driver({firstName: '', lastName: 'Tsunoda', team: teams.alpha, cost: 8.8}),
    'giovinazzi': new Driver({firstName: '', lastName: 'Giovinazzi', team: teams.alfa, cost: 7.9}),
    'latifi': new Driver({firstName: '', lastName: 'Latifi', team: teams.williams, cost: 6.5}),
    'russel': new Driver({firstName: '', lastName: 'Russel', team: teams.williams, cost: 6.2}),
    'schumacher': new Driver({firstName: 'Mick', lastName: 'Schumacher', team: teams.haas, cost: 5.8}),
    'mazepin': new Driver({firstName: '', lastName: 'Mazepin', team: teams.haas, cost: 5.5}),
};

export default {teams, drivers};
