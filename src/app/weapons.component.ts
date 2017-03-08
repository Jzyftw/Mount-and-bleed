import { Component, OnInit } from '@angular/core';
import { Weapon } from './weapon';
import { WeaponService } from './weapon.service';
import {Router} from "@angular/router";

@Component(
  {
    selector: 'my-weapons',
    templateUrl: './views/weapons.component.html',
    styleUrls: ['./views/css/app.component.css'],
  })

export class WeaponsComponent implements OnInit {
  weapons: Weapon[];

  constructor(
    private router: Router,
    private weaponService: WeaponService) { }

  getWeapons(): void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }
  ngOnInit(): void {
    this.getWeapons();
  }
};
