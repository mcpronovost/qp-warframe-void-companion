export interface TypeAppStore {
  "isLoading": boolean
}

export interface TypeUserStore {
  "rat": string|null,
  "id": number|null,
  "username": string|null,
  "email": string|null,
  "name": string|null,
  "slug": string|null,
  "lang": string,
  "tz": string,
  "last": number,
  "is_completed": boolean,
  "hide_completed_warframes": boolean
}
