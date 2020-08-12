import { RootState } from 'store'
import { setWill } from 'store/report'
import { connect } from 'react-redux'

import Page from './page'

const mapStateToProps = (state: RootState) => ({
  will: state.report.will
})

const mapDispatchToProps = { 
  setWill
}

export default connect(mapStateToProps, mapDispatchToProps)(Page)