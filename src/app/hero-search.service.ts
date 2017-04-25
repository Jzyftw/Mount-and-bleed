import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Hero }           from './hero';
@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}


  /**
   * Récupère les héros correspondants aux critères passés en paramètre
   * @param term
   * @returns {Observable<R>}
   */
  search(term: string): Observable<Hero[]> {
    //Recherche par caractéristiques
    if(term.indexOf("attack") != -1 || term.indexOf("dodge") != -1 || term.indexOf("HP") != -1 || term.indexOf("damage") != -1){
      return this.http
        .get(`app/heroes/?${term}`)
        .map(response => response.json().data as Hero[]);
    }
    //Recherche par nom
    else{
      return this.http
        .get(`app/heroes/?name=${term}`)
        .map(response => response.json().data as Hero[]);
    }
  }
}
