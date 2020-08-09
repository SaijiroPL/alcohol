import { RootState } from 'store'
import { setAge, setAnswer1 } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question1,
  age: state.question.age
})

const mapDispatchToProps = { 
  setAge,
  setAnswer: setAnswer1
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)