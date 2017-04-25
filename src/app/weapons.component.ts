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

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    this.getWeapons();
  }

  /**
   * Tri des héros par points de vie
   */
  sortbyHP() : void {
    this.weapons.sort(function (a, b){return b.HP - a.HP});
  }

  /**
   * Tri des héros par attaque
   */
  sortbyAttack(): void {
    this.weapons.sort(function (a, b){return b.attack - a.attack});
  }

  /**
   * Tri des héros par esquive
   */
  sortbyDodge(): void {
    this.weapons.sort(function (a, b){return b.dodge - a.dodge});
  }

  /**
   * Permet de récupérer les armes
   */
  getWeapons(): void {
    this.weaponService.getWeapons().then(weapons => this.weapons = weapons);
  }

  /**
   * Définit l'arme passée en param comme arme sélectionnée
   * @param weapon
   */
  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  /**
   * Voir détail de l'arme sélectionnée
   */
  gotoDetail(): void {
    this.router.navigate(['/weaponDetail', this.selectedWeapon.id]);
  }

  /**
   * Crée une arme dont le nom est passé en paramètre
   * @param name
   */
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

  /**
   * Supprime une arme dont le nom est passé en param
   * @param weapon
   */
  delete(weapon: Weapon): void {
    this.weaponService
      .delete(weapon.id)
      .then(() => {
        this.weapons = this.weapons.filter(w => w !== weapon);
        if (this.selectedWeapon === weapon) { this.selectedWeapon = null; }
      });
  }
};
