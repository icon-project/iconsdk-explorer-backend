import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class CompleteTransaction extends Component {

  closePopup = () => {
    this.props.initExternalState()
    window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      this.props.initExternalState()
      window.chrome.runtime.sendMessage({ type: 'CLOSE_POPUP' });
    }
  }

  render() {
    const { I18n, transaction } = this.props;
    const { txHash, error } = transaction
    const Content = () => {
      if (!!txHash) {
        return (
          <div className="wrap remittance complete" onKeyDown={this.handleKeyPress}>
            <div className="content-wrap">
              <div className="scroll">
                <i className="_img"></i>
                <p ref={ref => { if (ref) ref.innerHTML = I18n.completeTransaction.success }}></p>
              </div>
            </div>
            <div className="footer cols-2">
              <button className="btn-type-normal" onClick={this.closePopup}><span>{I18n.button.close}</span></button>
            </div>
          </div>
        )
      }
      else if (!!error) {
        return (
          <div className="wrap remittance fail">
            <div className="content-wrap">
              <div className="scroll">
                <i className="_img"></i>
                <p ref={ref => { if (ref) ref.innerHTML = I18n.completeTransaction.fail }}></p>
              </div>
            </div>
            <div className="footer cols-1">
              <button className="btn-type-normal" onClick={this.closePopup} ><span>{I18n.button.close}</span></button>
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="wrap remittance"></div>
        )
      }
    }
    return Content()
  }
}

export default CompleteTransaction;
