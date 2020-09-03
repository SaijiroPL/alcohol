import { RootState } from 'store'
import { setAnswer8, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question8
})

const mapDispatchToProps = { 
  setAnswer: setAnswer8,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)