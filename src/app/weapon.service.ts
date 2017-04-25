import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Weapon} from "./weapon";

@Injectable()

export class WeaponService {

  private weaponsUrl = 'api/weapons';  // URL to web api

  constructor(private http: Http) { }

  /**
   * Renvoie un tableau contenant les armes sous forme de promise
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  getWeapons(): Promise<Weapon[]> {
    return this.http.get(this.weaponsUrl)
      .toPromise()
      .then(response => response.json().data as Weapon[])
      .catch(this.handleError);
  }

  /**
   * Renvoie l'arme dont l'id est passé en paramètre sous forme de promise
   * @param id
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  getWeapon(id: number): Promise<Weapon> {
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Weapon)
      .catch(this.handleError);
  }

  /**
   * En cas d'erreur, l'affiche en console et annule la promise
   * @param error
   * @returns {Promise<void>|Promise<T>}
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  private headers = new Headers({'Content-Type': 'application/json'});

  /**
   * Mise à jour des carac. de l'arme passée en paramètre, renvoie l'arme mise à jour sous forme de promise
   * @param weapon
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  update(weapon: Weapon): Promise<Weapon> {
    const url = `${this.weaponsUrl}/${weapon.id}`;
    return this.http
      .put(url, JSON.stringify(weapon), {headers: this.headers})
      .toPromise()
      .then(() => weapon)
      .catch(this.handleError);
  }

  /**
   * Crée une arme dont le nom est passé en paramètre
   * @param name
   * @returns {Promise<R>|Promise<Promise<any>>}
   */
  create(name: string): Promise<Weapon> {
    return this.http
      .post(this.weaponsUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }


  delete(id: number): Promise<void> {
    const url = `${this.weaponsUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
