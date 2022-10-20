import { connect } from 'react-redux';
import { Header } from 'app/components/';
import { setLanguage } from 'redux/actions/globalActions';
import { resetEXTRPageReducer } from 'redux/actions/exchangeTransactionActions'
import { withRouter } from 'react-router-dom';

function mapStateToProps(state) {
  return {
    wallets: state.wallet.wallets,
    isLedger: state.ledger.isLedger,
    isLoggedIn: state.auth.isLoggedIn,
    isLocked: state.auth.isLocked,
    passcodeHash: state.global.passcodeHash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetEXTRPageReducer: () => dispatch(resetEXTRPageReducer()),
    setLanguage: (lan) => dispatch(setLanguage(lan))
  };
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withRouter(HeaderContainer);
