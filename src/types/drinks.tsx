export interface StandardDrink {
  id: string
  icon: string
  type: string
  subType?: string
  percent: number
  volume1: number | string
  volume2?: number
  unit: string
}

export interface OtherDrink {
  alcohol: number
  volume: number
}

export interface DrinkVolume {
  id: string
  volume: number
}
