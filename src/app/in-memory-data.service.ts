import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 1, armeId : 0, name: 'Mr.Nice', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 },
      {id: 2, armeId : 0, name: 'Narco', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 },
      {id: 3, armeId : 0, name: 'Bombasto', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 },
      {id: 4, armeId : 0, name: 'Celeritas', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 }
    ];

    let weapons = [
      {id: 1, name: 'Déchireuse de l\'enfer',  attack: 7, dodge : -10, damage : 5, HP: -3 }
    ];

    return {heroes, weapons};
  }
}
