import { RootState } from 'store'
import { setDrink, setOtherDrink, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks
})

const mapDispatchToProps = { 
  setDrink,
  setOtherDrink,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)