import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './views/dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    /**
     * Renvoie les héros triés par "puissance" (héros le plus de caractéristiques en premier)
     */
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(2, 5).sort(function (a, b){return (b.attack + b.HP + b.damage + b.dodge) - (a.attack + a.HP + a.damage + a.dodge)}));
  }
}
