import { RootState } from 'store'
import { setDisease, load as loadR } from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  daily: state.report.daily,
  rank: state.report.rank,
  disease: state.report.disease
})

const mapDispatchToProps = { 
  setDisease, loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)