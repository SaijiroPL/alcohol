export interface StandardDrinkInfo {
  id: string
  icon: string
  type: string
  subType?: string
  percent: number
  volume1: number
  volume2?: number
  volumeStr?: string
  unit: string
}

export interface OtherDrink {
  alcohol: number
  volume: number
}

export interface DrinkVolume {
  id: string
  volume: number
  volume2: number
}
