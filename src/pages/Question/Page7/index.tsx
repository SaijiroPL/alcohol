import { RootState } from 'store'
import { setAnswer7 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question7
})

const mapDispatchToProps = { 
  setAnswer: setAnswer7
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)