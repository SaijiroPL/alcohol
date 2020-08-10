import { RootState } from 'store'
import { setAnswer2 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  drinks: state.question.drinks
})

const mapDispatchToProps = { 
  setAnswer: setAnswer2
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)