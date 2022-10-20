import React, { Component } from 'react';
import {convertNumberToText, isEmpty} from 'utils'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class MyWalletHeaderLeft extends Component {

  render() {
    const {
      I18n,
      dataSortedByCoin
    } = this.props;

    return (
      <div className="a-group">
        <div className="a">
          <span>{I18n.myWalletHeaderTotalValue}
            <em className="_img"></em>
            <div className="layer left">
              {I18n.myWalletHeaderInfo_1}<br />{I18n.myWalletHeaderInfo_2}
            </div>
          </span>
        </div>
        <div className="b">
          <span><em className={(this.props.totalBalance === 0 ? 'zero' : '')}>{convertNumberToText(this.props.totalBalance, null, false)}</em></span>
          <p>{I18n.myWalletHeaderInfo_3}</p>
        </div>
        <div className="c">
          <span>{I18n.myWalletHeaderCoinNum}
            <em className={(!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['coin']).length === 0) ? 'zero' : ''}>
              {!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['coin']).length}
            </em>
            <em>{I18n.myWalletHeaderNumUnit}</em>
          </span>
          <span>{I18n.myWalletHeaderTokenNum}
            <em className={(!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['token']).length === 0) ? 'zero' : ''}>
              {!isEmpty(dataSortedByCoin) && Object.keys(dataSortedByCoin['token']).length}
            </em>
            <em>{I18n.myWalletHeaderNumUnit}</em>
          </span>
        </div>
      </div>
    );
  }
}

export default MyWalletHeaderLeft;
