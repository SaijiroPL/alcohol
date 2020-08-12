import { RootState } from 'store'
import { setDisease } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  daily: state.report.daily,
  rank: state.report.rank,
  disease: state.report.disease
})

const mapDispatchToProps = { 
  setDisease
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)