import React, { Component } from 'react';
import {
  routeConstants as ROUTE
} from 'constants/index.js';
import { Link, withRouter } from 'react-router-dom';
import withLanguageProps from 'HOC/withLanguageProps';
import { isEmpty } from 'utils';

const INIT_STATE = {
  showInfo: false,
  toggleLanguageList: false
}

@withRouter
@withLanguageProps
class Header extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  toggleLanguageList = () => {
    this.setState({
      toggleLanguageList: !this.state.toggleLanguageList
    })
  }

  showInfo = () => {
    this.setState({
      showInfo: true
    })
  }

  disableExchange = () => {
    const { I18n } = this.props;
    alert(I18n.error.alertExchange);
    return;
  }

  hideInfo = () => {
    this.setState({
      showInfo: false
    })
  }

  onHeaderClick = () => {
    if (this.state.toggleLanguageList) {
      this.setState({
        toggleLanguageList: false
      })
    }
  }

  goToTransactionPage = () => {
    this.props.resetEXTRPageReducer()
    this.props.history.push({
      pathname: ROUTE['transaction']
    });
  }

  render() {
    const { wallets, isLedger, setLanguage, language, location, isLoggedIn, isLocked, I18n } = this.props;
    const isHome = !isLoggedIn;
    const showHeaderItem = !(isHome || isLocked) || isLedger
    const isLedgerAccess = isEmpty(wallets) && isLedger

    return (
      <div className="header-wrap" onClick={this.onHeaderClick}>
        <div className="wrap-holder">
          {showHeaderItem && (
            <Link to={ROUTE['home']}><p className="logo"><span className="_img"></span></p></Link>
          )}
          {showHeaderItem && !isLedgerAccess && (
            <div className="menu-holder">
              <Link to={ROUTE['home']}><span className={`wallet ${location.pathname === ROUTE['home'] || location.pathname.includes('mywallet') ? 'on' : ''}`}>{I18n.myWallet}</span></Link>
              <Link to="/transaction"><span onClick={this.goToTransactionPage} className={`remittance ${location.pathname === '/transaction' && 'on'}`}>{I18n.transfer}</span></Link>
              <Link to="/contract"><span className={`contract ${location.pathname === '/contract' && 'on'}`}>{I18n.contract}</span></Link>
              <Link to="/mypage"><span className={`mypage ${location.pathname === '/mypage' && 'on'}`}>{I18n.myPage}</span></Link>
            </div>
          )}
          <div className="language-holder">
            <span onClick={() => setLanguage('kr')} className={language === 'kr' ? 'on' : ''}>KR</span>
            <span className="dot">·</span>
            <span onClick={() => setLanguage('en')} className={language === 'en' ? 'on' : ''}>EN</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
