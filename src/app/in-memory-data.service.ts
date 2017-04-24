import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 1, armeId : 0, name: 'Mr.Nice', points:24, attack: 4, dodge : 1, damage : 1, HP: 10 },
      {id: 2, armeId : 0, name: 'Narco', points:28, attack: 1, dodge : 1, damage : 1, HP: 9 },
      {id: 3, armeId : 0, name: 'Bombasto', points:18, attack: 5, dodge : 1, damage : 1, HP: 15 },
      {id: 4, armeId : 0, name: 'Celeritas', points:23, attack: 2, dodge : 1, damage : 1, HP: 13 }
    ];

    let weapons = [
      {id: 1, name: 'Déchireuse de l\'enfer',  attack: 2, dodge : -2, damage : 1, HP: -1 },
      {id: 2, name: 'Frostmourne', attack: 5, dodge: -5, damage: 5, HP: -5 },
      {id: 3, name: 'Ashbringer', attack: -5, dodge: 5, damage: -5, HP: 5}
    ];

    return {heroes, weapons};
  }
}
