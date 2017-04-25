import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import {Router} from "@angular/router";


@Component(
  {
    selector: 'my-heroes',
    templateUrl: './views/heroes.component.html',
    styleUrls: ['./views/css/app.component.css'],
})


export class HeroesComponent implements OnInit {
  title = 'Mount and Bleed';
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private router: Router,
    private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  ngOnInit(): void {
    this.getHeroes();
  }
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /**
   * Accès au détails d'un héros
   */

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      });
  }

  /**
   * Tri des héros par points de vie
   */
  sortbyHP() : void {
    this.heroes.sort(function (a, b){return b.HP - a.HP});
  }

  /**
   * Tri des héros par attaque
   */
  sortbyAttack(): void {
    this.heroes.sort(function (a, b){return b.attack - a.attack});
  }

  /**
   * Tri des héros par esquive
   */
  sortbyDodge(): void {
    this.heroes.sort(function (a, b){return b.dodge - a.dodge});
  }

  /**
   * Suppression du héros passé en paramètre
   * @param hero
   */
  delete(hero: Hero): void {
    this.heroService
      .delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }

}
