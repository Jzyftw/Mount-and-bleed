import { Hero } from './hero';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { HeroService } from './hero.service';
import { WeaponService } from './weapon.service';
import {Weapon} from "./weapon";


@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './views/hero-detail.component.html',
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  weapons: Weapon[];

  constructor(
    private heroService: HeroService,
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
    this.getWeapons();
  }

  save(): void {
      this.heroService.update(this.hero)
        .then(() => this.goBack());
  }

  //Gestion des caractéristiques
  checkChar(param):void {
    console.log(param);
    var chars = this.hero.damage + this.hero.attack + this.hero.HP + this.hero.dodge;
    this.hero.points = 40 - chars;
    //Si on dépasse le nombre de points autorisé
    if(this.hero.points < 0){
      this.hero.points = 0; //Juste pour éviter les chiffres négatifs sur l'affichage
      alert("Vous n'avez plus de points");
      if(param == 'attack'){
        this.hero.attack = (40 - (this.hero.damage + this.hero.HP + this.hero.dodge));
      } else if(param == 'dodge') {
        this.hero.dodge = (40 - (this.hero.damage + this.hero.HP + this.hero.attack));
      } else if(param == 'HP') {
        this.hero.HP = (40 - (this.hero.damage + this.hero.attack + this.hero.dodge));
      } else {
        this.hero.damage = (40 - (this.hero.attack + this.hero.HP + this.hero.dodge));
      };
    }
  }


  getWeapons() : void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }

  goBack(): void {
    this.location.back();
  }

}
