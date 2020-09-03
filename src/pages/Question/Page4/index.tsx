import { RootState } from 'store'
import { setAnswer4, setAlcohol, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question4,
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks
})

const mapDispatchToProps = { 
  setAlcohol,
  setAnswer: setAnswer4,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)