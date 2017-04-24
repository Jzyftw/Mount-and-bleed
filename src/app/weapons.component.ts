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
  selectedWeapon: Weapon;

  constructor(
    private router: Router,
    private weaponService: WeaponService) { }

  getWeapons(): void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }
  ngOnInit(): void {
    this.getWeapons();
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  gotoDetail(): void {
    this.router.navigate(['/weaponDetail', this.selectedWeapon.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.weaponService.create(name)
      .then(weapon => {
        weapon.attack = 1;
        weapon.HP = 1;
        weapon.dodge = 1;
        weapon.damage = 1;
        this.weapons.push(weapon);
        this.selectedWeapon = null;
      });
  }

  delete(weapon: Weapon): void {
    this.weaponService
      .delete(weapon.id)
      .then(() => {
        this.weapons = this.weapons.filter(w => w !== weapon);
        if (this.selectedWeapon === weapon) { this.selectedWeapon = null; }
      });
  }
};
