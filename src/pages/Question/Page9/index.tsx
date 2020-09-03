import { RootState } from 'store'
import { setAnswer9, load } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question9
})

const mapDispatchToProps = { 
  setAnswer: setAnswer9,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)