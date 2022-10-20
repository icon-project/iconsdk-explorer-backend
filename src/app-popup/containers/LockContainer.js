import { connect } from 'react-redux';
import Lock from 'app-popup/components/Lock';
import { openPopup } from 'redux/actions/popupActions';
import { setLockState } from 'redux/actions/authActions';
import { setShowChangePasscodePopup } from 'redux/actions/globalActions';
import { withRouter } from 'react-router-dom';
import { getWallet } from 'redux/actions/walletActions';

function mapStateToProps(state) {
  return {
    passcodeHash: state.global.passcodeHash,
    language: state.global.language
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openPopup: (s) => dispatch(openPopup(s)),
    setShowChangePasscodePopup: (isTrue) => dispatch(setShowChangePasscodePopup(isTrue)),
    getWallet: () => dispatch(getWallet()),
    setLockState: (isLocked) => dispatch(setLockState(isLocked)),
  };
}

const LockContainer = connect(mapStateToProps, mapDispatchToProps)(Lock);

export default withRouter(LockContainer);
