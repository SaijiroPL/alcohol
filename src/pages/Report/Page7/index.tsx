import { RootState } from 'store'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  score: state.report.score,
  question: [
    state.question.question2,
    state.question.alcohol,
    state.question.question4,
    state.question.question5,
    state.question.question6,
    state.question.question7,
    state.question.question8,
    state.question.question9,
    state.question.question10,
    state.question.question11,
  ],
  alcohol: state.question.alcohol,
  rank: state.report.rank,
  daily: state.report.daily,
  gender: state.question.question1,
  age: state.question.age,
  question2: state.question.question2,
  drinks: state.question.drinks,
  otherDrinks: state.question.otherDrinks,
  newRank: state.report.newRank,
  newDaily: state.report.newDaily,
  newDrinks: state.report.drinks,
  newOtherDrinks: state.report.otherDrinks,
  disease: state.report.disease,
  newDisease: state.report.newDisease,
  will: state.report.will,
  group: state.report.group
})

const mapDispatchToProps = { 

}

export default connect(mapStateToProps, mapDispatchToProps)(Page)