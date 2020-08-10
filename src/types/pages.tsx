import { DrinkVolume } from 'types/drinks'

export interface QuestionProps {
  answer: number
  setAnswer: (answer: number) => void
}

export interface DrinkProps {
  drinks: DrinkVolume[]
}