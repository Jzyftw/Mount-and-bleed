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
  selector: 'my-weapon-detail',
  templateUrl: './views/weapon-detail.component.html',
})

export class WeaponDetailComponent implements OnInit {
  @Input() weapon: Weapon;
  points : number = 0;

  constructor(
    private heroService: HeroService,
    private weaponService: WeaponService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.weaponService.getWeapon(+params['id']))
      .subscribe(weapon => this.weapon = weapon);
  }

  /*
   Characteristics check
   */
  checkChar():void {
    var chars = this.weapon.HP + this.weapon.attack + this.weapon.damage + this.weapon.dodge;
    this.points = chars;
  }

  /*
   Saves the current stats of a weapon
   */
  save(): void {
    if(this.points == 0){
      this.weaponService.update(this.weapon)
        .then(() => this.goBack());
    }
    else{
      alert("Weapon points must be equal to 0");
    }
  }

  goBack(): void {
    this.location.back();
  }



}
