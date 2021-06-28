import { RootState } from 'store'
import { setCode } from 'store/question'
import { setAge as setReportAge, setGender } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  code: state.question.code
})

const mapDispatchToProps = { 
  setCode,
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)