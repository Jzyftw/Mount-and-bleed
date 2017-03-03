import { Hero } from './hero';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { HeroService } from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-hero-detail',
  templateUrl: './views/hero-detail.component.html',
})

export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  save(): void {
      this.heroService.update(this.hero)
        .then(() => this.goBack());
  }

  checkChar(param):void {
    console.log(param);
    var chars = this.hero.damage + this.hero.attack + this.hero.HP + this.hero.dodge;
    this.hero.points = 40 - chars;
    if(this.hero.points < 0){
      this.hero.points = 0; //Juste pour éviter les chiffres négatifs sur l'affichage
      alert("Vous n'avez plus de points");
      if(param == 'attack'){
        console.log((this.hero.damage + this.hero.HP + this.hero.dodge));
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

  goBack(): void {
    this.location.back();
  }

}
