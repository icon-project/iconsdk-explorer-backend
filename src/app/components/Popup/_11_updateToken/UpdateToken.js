import React, { Component } from 'react';
import { isIcxContractAddress, isAddress, checkLength } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  address: '',
  name: '',
  symbol: '',
  decimals: '',
  addressError: '',
  nameError: '',
  symbolError: '',
  decimalsError: '',
  isLoading: false
}

@withLanguageProps
class UpdateToken extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    const prevToken = this.props.wallets[this.props.selectedAccount].tokens[this.props.selectedTokenId];
    this.setState({
      address: prevToken.address,
      name: prevToken.name,
      symbol: prevToken.symbol,
      decimals: prevToken.decimals
    });
  }

  componentWillUnmount() {
    this.setState(INIT_STATE);
  }

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }


  validateForm = (e, state = '') => {
    let {
      address,
      addressError,
      name,
      nameError,
      symbol,
      symbolError,
      decimals,
      decimalsError
    } = this.state;

    const currentWallet = this.props.wallets[this.props.selectedAccount];

    let targetArr = [];

    if (state === 'submit') {
      targetArr = targetArr.concat(['address', 'name', 'symbol', 'decimals']);
    } else {
      const target = e.target.getAttribute('data-type');
      targetArr.push(target);
    }

    const { I18n } = this.props;
    targetArr.forEach((target) => {
      switch (target) {
        case 'address':
          if (address.length < 1) { addressError = I18n.error.addressEnter; }
          else if ((currentWallet.type === 'icx' && !isIcxContractAddress(address)) || (currentWallet.type === 'eth' && !isAddress(address))) { addressError = I18n.error.addressNotValid }
          else { addressError = ''; }
          break;
        case 'name':
          if (name.trim().length < 1) { nameError = I18n.error.tokenNameEnter; }
          else { nameError = ''; }
          break;
        case 'symbol':
          if (symbol.length < 1) { symbolError = I18n.error.tokenSymbolEnter; }
          else { symbolError = ''; }
          break;
        case 'decimals':
          if (decimals.length < 1) { decimalsError = I18n.error.tokenDecimalsEnter; }
          else { decimalsError = ''; }
          break;
        default:
          break;
      }
    })

    this.setState({
      addressError: addressError,
      nameError: nameError,
      symbolError: symbolError,
      decimalsError: decimalsError
    }, () => {
      if ((state === 'submit') && !addressError && !nameError && !symbolError && !decimalsError) {
        this.handleSubmit();
      }
    })
  }

  handleSubmit = () => {
    const {
      name,
      symbol,
      decimals,
    } = this.state;

    const data = {
      name,
      symbol,
      decimals
    }

    this.setState({
      isLoading: true,
      addressError: ''
    }, () => {
      this.props.updateToken(this.props.selectedAccount, this.props.selectedTokenId, data);
    })
  }

  changeInput = (e) => {
    const target = e.target.getAttribute('data-type');
    if (target === 'name' && checkLength(e.target.value) > 64) return;

    const state = this.state;
    state[target] = e.target.validity.valid ? e.target.value : state[target];
    this.setState(state);
  }

  render() {
    const {
      address,
      addressError,
      name,
      nameError,
      symbol,
      symbolError,
      decimals,
      decimalsError,
      isLoading
    } = this.state;
    const { wallets, selectedAccount, I18n } = this.props;
    const walletCoinType = wallets[selectedAccount].type
    return (
      <div>
        <div className="dimmed fade-in"></div>
        <div className="popup moving-down">
          <div className="header-white">
            <h1 className="title">{I18n.updateToken.title}</h1>
            <h2>{I18n.updateToken.desc}</h2>
          </div>
          <div className="scroll-holder">
            <div className="scroll">
              <div className="tabbox-holder token">
                <div className="name-group">
                  <p className="title">{I18n.updateToken.inputLabel1}</p>
                  <input type="text" onBlur={this.validateForm} className="txt-type-normal" data-type="address" placeholder={I18n.updateToken.inputPlaceHolder1} value={address} readOnly />
                  <p className='error'>{addressError}</p>
                </div>
                <div className="name-group">
                  <p className="title">{I18n.updateToken.inputLabel2}</p>
                  <input onChange={this.changeInput} onBlur={this.validateForm} type="text" className="txt-type-normal" data-type="name" placeholder={I18n.updateToken.inputPlaceHolder2} value={name} spellCheck="false" />
                  <p className='error'>{nameError}</p>
                </div>
                <div className="name-group">
                  <p className="title">{I18n.updateToken.inputLabel3}</p>
                  <input disabled={walletCoinType === 'icx' && true} onChange={this.changeInput} onBlur={this.validateForm} type="text" pattern="[A-Za-z0-9]{1,10}" className="txt-type-normal" data-type="symbol" placeholder={I18n.updateToken.inputPlaceHolder3} value={symbol} spellCheck="false" />
                  <p className='error'>{symbolError}</p>
                </div>
                <div className="name-group">
                  <p className="title">{I18n.updateToken.inputLabel4}</p>
                  <input disabled={walletCoinType === 'icx' && true} onChange={this.changeInput} onBlur={this.validateForm} type="text" pattern="[0-9]*" className="txt-type-normal" data-type="decimals" placeholder={I18n.updateToken.inputPlaceHolder4} value={decimals} spellCheck="false" />
                  <p className='error'>{decimalsError}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-holder full">
            <button onClick={this.closePopup} className="btn-type-fill size-half"><span>{I18n.button.cancel}</span></button>
            <button disabled={isLoading} onClick={() => this.validateForm(null, 'submit')} type="submit" className="btn-type-normal size-half"><span>{I18n.button.modify}</span></button>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateToken;
