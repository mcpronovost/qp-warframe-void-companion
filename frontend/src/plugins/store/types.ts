export interface TypeAppStore {
  "isLoading": boolean
}

export interface TypeUserStore {
  "rat": string|null,
  "id": number|null,
  "username": string|null,
  "email": string|null,
  "name": string|null,
  "lang": string,
  "tz": string,
  "last": number
}
