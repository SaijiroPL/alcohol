import { RootState } from 'store'
import { setAnswer5 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question5
})

const mapDispatchToProps = { 
  setAnswer: setAnswer5
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)