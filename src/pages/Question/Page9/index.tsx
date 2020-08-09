import { RootState } from 'store'
import { setAnswer9 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question9
})

const mapDispatchToProps = { 
  setAnswer: setAnswer9
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)