import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      {id: 11, armeId : 0, name: 'Mr. Nice', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 },
      {id: 12, armeId : 0, name: 'Narco', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 },
      {id: 13, armeId : 0, name: 'Bombasto', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 },
      {id: 14, armeId : 0, name: 'Celeritas', points:27, attack: 1, dodge : 1, damage : 1, HP: 10 }
    ];
    return {heroes};
  }
}
