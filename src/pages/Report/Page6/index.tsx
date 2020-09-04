import { RootState } from 'store'
import { setWill, load as loadR } from 'store/report'
import { load as loadQ } from 'store/question'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  will: state.report.will
})

const mapDispatchToProps = { 
  setWill,
  loadQ, loadR
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)