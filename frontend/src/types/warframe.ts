export interface TypeWarframeSimple {
  id: number,
  name: string,
  image_name: string
}

export interface TypeRelic {
  id: number,
  name: string,
  era: string,
  components?: any,
  warframe_rewards?: Array<TypeReward>,
  primaryweapon_rewards?: Array<TypeReward>,
  secondaryweapon_rewards?: Array<TypeReward>,
  meleeweapon_rewards?: Array<TypeReward>
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

export interface TypeReward {
  id: number,
  relic: TypeRelic,
  component: TypeWarframeComponent|TypeWeaponComponent,
  percent: number,
  is_owned: boolean
}

export interface TypeWarframeComponent {
  id: number,
  name: string,
  fullname: string,
  quantity: number,
  quantity_count: number,
  warframe: TypeWarframeSimple
}

export interface TypeWeaponComponent {
  id: number,
  name: string,
  fullname: string,
  quantity: number,
  quantity_count: number,
  weapon: number
}
