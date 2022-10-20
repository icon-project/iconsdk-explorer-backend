import React, { Component } from 'react';
import BigNumber from 'bignumber.js';
import { withRouter } from 'react-router-dom';
import { LoadingComponent, QrcodeComponent, CopyButton, Alert } from 'app/components/'
import { routeConstants as ROUTE, coinImage as COIN_IMAGE, coinName as COIN_NAME } from 'constants/index'
import { convertNumberToText } from 'utils';
import DEFAULT_ICON from 'app/image/icon/icon_default.png';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  wallet: {},
  showInfo: false,
  balanceStyle: {},
  showAlertNoBalance: false,
}

@withRouter
@withLanguageProps
class CoinDetailContent extends Component {

  constructor(props) {
    super(props);
    const url = this.props.match.params.id;
    const isToken = this.props.match.params.id.includes("_");

    this.state = Object.assign({}, INIT_STATE, {
      account: !isToken ? url : url.split("_")[0],
      tokenId: !isToken ? '' : url.split("_")[1],
      isToken: isToken
    });

    // To resize font size only once
    this.fontSizeUpdated = false
  }

  componentWillMount() {
    const { account, tokenId, isToken } = this.state;
    if (isToken) {
      const wallet = this.props.wallets[account];
      const token = wallet.tokens[tokenId];
      this.props.fetchTokenBalance(tokenId, token.address, token.decimals, wallet.account, wallet.type);
    } else {
      const wallet = this.props.wallets[account];
      this.props.fetchCoinBalance(wallet.account, wallet.type);
    }
  }

  componentWillUnmount() {
    this.props.resetReducer();
  }

  componentDidUpdate(prevProps) {
    if (this.fontSizeUpdated) return

    const { account, tokenId, isToken } = this.state;
    const getFontSize = (divWidth, emWidth) => {
      this.fontSizeUpdated = true
      let fontSize = 0
      fontSize = 500 / (divWidth - emWidth);
      fontSize = Math.min(Math.max(fontSize, 0.4), 1) * 46;
      return fontSize
    }

    if (isToken) {
      const wallet = this.props.wallets[account];
      const token = wallet.tokens[tokenId];
      if (prevProps.wallets[account].tokens[tokenId].balanceLoading !== token.balanceLoading && !token.balanceLoading) {
        this.setState({
          balanceStyle: {
            fontSize: getFontSize(this.refs.balanceDiv.offsetWidth, this.refs.balanceEm.offsetWidth),
            visibility: 'visible',
          }
        })
      }
    } else {
      const wallet = this.props.wallets[account];
      if (prevProps.wallets[account].balanceLoading !== wallet.balanceLoading && !wallet.balanceLoading) {
        this.setState({
          balanceStyle: {
            fontSize: getFontSize(this.refs.balanceDiv.offsetWidth, this.refs.balanceEm.offsetWidth),
            visibility: 'visible',
          }
        })
      }
    }
  }

  handleUpdateToken = () => {
    const { account, tokenId } = this.state;
    this.props.setSelectedWallet({
      account,
      tokenId
    });
    this.props.openPopup({
      popupType: 'updateToken'
    });
  }

  handleDeleteToken = () => {
    const { account, tokenId } = this.state;
    this.props.setSelectedWallet({
      account,
      tokenId
    });
    this.props.openPopup({
      popupType: 'deleteToken'
    });
  }

  handleTransactionClick = (balance) => {
    const { account, tokenId } = this.state;
    const { history } = this.props;
    if (balance.eq(0)) {
      this.setState({
        showAlertNoBalance: true
      });
      return false;
    }
    this.props.setSelectedWallet({
      account,
      tokenId
    });
    history.push({
      pathname: ROUTE['transaction']
    });
    this.props.openPopup({
      popupType: 'sendTransaction_transaction'
    });
  }

  closeAlert = () => {
    this.setState({
      showAlertNoBalance: false,
    });
  }

  setData = () => {
    const { account, tokenId, isToken } = this.state;
    let data;

    if (isToken) {
      const wallet = this.props.wallets[account]
      const token = wallet.tokens[tokenId];
      data = {
        walletName: wallet.name,
        name: token.name,
        coinType: token.symbol,
        walletCoinType: wallet.type,
        account: wallet.account,
        contractAddress: token.address,
        balanceLoading: token.balanceLoading,
        balance: token.balance,
        symbol: token.symbol,
        defaultSymbol: token.defaultSymbol,
        decimals: token.decimals,
        defaultDecimals: token.defaultDecimals,
        coinImage: COIN_IMAGE[token.symbol] || DEFAULT_ICON
      }
    } else {
      const wallet = this.props.wallets[account];
      data = {
        walletName: wallet.name,
        name: COIN_NAME[wallet.type],
        coinType: wallet.type,
        walletCoinType: wallet.type,
        account: wallet.account,
        balanceLoading: wallet.balanceLoading,
        balance: wallet.balance,
        coinImage: COIN_IMAGE[wallet.type]
      }
      if (wallet.type === 'icx') {
        data = Object.assign({}, data, {
          totalBalance: new BigNumber(wallet.balance)
        })
      }
    }
    return data;
  }

  render() {
    const {
      isToken,
      showAlertNoBalance,
    } = this.state;

    const {
      I18n
    } = this.props;

    const data = this.setData();
    return (
      <div>
        <div className={`title-holder ${data.coinType}`}>
          <h1>{COIN_NAME[data.coinType] && (<em className="_icon"></em>)}
            {data.name}</h1>
        </div>

        <div className="wrap-holder bg">
          <h2>{data.walletName}</h2>
          <div className="coin-holder">
            <span className="c">
              <div ref="balanceDiv" style={this.state.balanceStyle}>
                { data.balanceLoading ?
                    (<div className="load"><LoadingComponent type="black" /></div>) :
                    convertNumberToText(data.balance, 'transaction', true) }
                <em ref="balanceEm">{data.coinType.toUpperCase()}</em>
              </div>
            </span>
            <div className="exchange-holder">
              {!data.balanceLoading && (<button onClick={() => this.handleTransactionClick(data.balance)} className="btn-type-exchange2"><span>{I18n.button.transfer}</span></button>)}
            </div>
          </div>

          <div className="deposit-hoder">
            <p>{I18n.coinDetailContentAddress}</p>
            <span>{data.account}<CopyButton type="small" target={data.account} text={I18n.button.copyDepositAddress} copyFinish={I18n.button.copyFinish} /></span>
            <ul>
              <li>· {I18n.coinDetailContentDesc1}</li>
              <li>· {I18n.coinDetailContentDesc2}</li>
            </ul>
            <div className="qr"><em><QrcodeComponent scale={3} text={data.account} /></em></div>
          </div>
          {isToken && (<span onClick={this.handleUpdateToken} className="edit-token"><em className="_img"></em>{I18n.button.changeToken}</span>)}
          {isToken && (<span onClick={this.handleDeleteToken} className="del-token"><em className="_img"></em>{I18n.button.removeToken}</span>)}
        </div>
        {
          showAlertNoBalance && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertNoBalance}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default CoinDetailContent;
