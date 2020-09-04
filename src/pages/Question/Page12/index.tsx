import { RootState } from 'store'
import { setAnswer12, load } from 'store/question'
import { setAge, setGroup, setGender } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  answer: state.question.question12,
  age: state.question.age,
  gender: state.question.question1
})

const mapDispatchToProps = { 
  setAge, setGender,
  setAnswer: setAnswer12,
  setGroup,
  loadState: load
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)