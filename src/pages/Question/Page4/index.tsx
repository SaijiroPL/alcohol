import { RootState } from 'store'
import { setAnswer4 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question4
})

const mapDispatchToProps = { 
  setAnswer: setAnswer4
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)