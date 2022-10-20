import React, { Component } from 'react';
import { isWalletNameExists, isValidWalletName } from 'utils';
import withLanguageProps from 'HOC/withLanguageProps';
import { Alert } from 'app/components/'

const INIT_STATE = {
  newWalletName: '',
  showAlertWalletName: false,
  showAlertWalletNameSame: false,
  walletNameError: ''
}

@withLanguageProps
class UpdateWalletName extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillMount() {
    this.setState({
      newWalletName: this.props.wallets[this.props.selectedAccount].name
    })
  }

  changeWalletName = (e) => {
    const { value } = e.target
    if (!isValidWalletName(value)) return

    this.setState({
      newWalletName: value
    })
  }

  closePopup = () => {
    this.setState(INIT_STATE);
    this.props.resetSelectedWallet();
    this.props.closePopup();
  }

  handleSubmit = () => {
    const error = this.validateForm();
    if (!error) {
      const trimedNewWalletName = this.state.newWalletName.trim();
      this.props.updateWalletName(this.props.selectedAccount, trimedNewWalletName);
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit()
    }
  }

  closeAlert = () => {
    this.setState({
      showAlertWalletName: false,
      showAlertWalletNameSame: false
    })
  }

  handleBlur = (e) => {
    this.validateForm(e.target.value);
  }

  handlePaste = e => {
    e.preventDefault();
  }

  validateForm = (e, state = "") => {
    let walletNameError = this.state.walletNameError;
    const { I18n } = this.props;
    if (!this.state.newWalletName) {
      walletNameError = I18n.error.alertWalletName
    } else if (this.state.newWalletName.indexOf(' ') >= 0 && !this.state.newWalletName.trim()) {
      walletNameError = I18n.error.pwErrorEmpty
    } else if (isWalletNameExists(this.props.wallets, this.state.newWalletName.trim())) {
      walletNameError = I18n.error.alertWalletNameSame
    } else {
      walletNameError = ''
    }
    this.setState({
      walletNameError
    })
    return walletNameError
  }

  render() {
    const {
      walletNameError,
      newWalletName,
      showAlertWalletName,
      showAlertWalletNameSame
    } = this.state;

    const { I18n } = this.props;

    return (
      <div>
        <div className="dimmed fade-in"></div>
        <div className="popup size-medium2 moving-down">
          <h1 className="title">{I18n.updateWalletName.title}</h1>
          <h2>{I18n.updateWalletName.desc}</h2>
          <div className="scroll-holder">
            <div className="scroll">
              <div className="tabbox-holder">
                <div>
                  <p className="title">{I18n.updateWalletName.inputLabel}</p>
                  <input 
                    onBlur={this.handleBlur} 
                    onChange={this.changeWalletName} 
                    type="text" 
                    className={`txt-type-normal ${walletNameError && 'error'}`} 
                    placeholder={I18n.updateWalletName.inputPlaceHolder} 
                    value={newWalletName} 
                    onKeyPress={this.handleKeyPress} 
                    onPaste={this.handlePaste}
                    spellCheck="false" />
                  <p className='error'>{walletNameError}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-holder full">
            <button onClick={this.closePopup} className="btn-type-fill size-half"><span>{I18n.button.cancel}</span></button>
            <button onClick={this.handleSubmit} type="submit" className="btn-type-normal size-half"><span>{I18n.button.change}</span></button>
          </div>
        </div>
        {
          showAlertWalletName && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertWalletName}
              cancelText={I18n.button.confirm}
            />
          )
        }
        {
          showAlertWalletNameSame && (
            <Alert
              handleCancel={this.closeAlert}
              text={I18n.error.alertWalletNameSame}
              cancelText={I18n.button.confirm}
            />
          )
        }
      </div>
    );
  }
}

export default UpdateWalletName;
