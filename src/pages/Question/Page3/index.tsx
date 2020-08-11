import { RootState } from 'store'
import { setDrink, setOtherDrink } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks
})

const mapDispatchToProps = { 
  setDrink,
  setOtherDrink
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)