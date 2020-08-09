import { RootState } from 'store'
import { setAnswer6 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question6
})

const mapDispatchToProps = { 
  setAnswer: setAnswer6
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)