
export interface TypeRelic {
  id: number,
  fullname: string,
  name: string,
  era: string,
  components?: any
}

export interface TypeWeapon {
  id: number,
  name: string,
  image_name: string,
  completion: number,
  components: Array<TypeWeaponComponent>
}

export interface TypeWeaponComponent {
  id: number,
  name: string,
  is_owned: boolean,
  relics?: any
}
