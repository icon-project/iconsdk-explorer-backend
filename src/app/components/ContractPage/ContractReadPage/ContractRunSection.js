import React, { Component } from 'react';
import { ContractExecuteSectionContainer } from 'app/containers/';
import withClickOut from 'HOC/withClickOut';
import withLanguageProps from 'HOC/withLanguageProps';
import isEqual from 'lodash.isequal';

const INIT_STATE = {
  showFuncList: false
}

@withLanguageProps
class ContractRunSection extends Component {

  constructor(props) {

    super(props);
    this.state = INIT_STATE;
  }

  toggleFuncList = () => {
    this.setState({
      showFuncList: !this.state.showFuncList
    })
  }

  render() {
    const { I18n, funcList, selectedFuncIndex } = this.props;
    const { showFuncList } = this.state;
    if (funcList.length > 0) {
      return (
        <div className="search-holder" style={{ minHeight: 420 }}>
          <div className="group">
            <span className="label">{I18n.contractReadPage}</span>
            <span className="money-group" onClick={this.toggleFuncList}>{funcList[selectedFuncIndex].name}<em className="_img"></em>
              {
                showFuncList && (
                  <ContractFuncSelector
                    onClickOut={this.toggleFuncList}
                    {...this.props} />
                )
              }
            </span>
            <ContractExecuteSectionContainer />
          </div>
        </div>
      );
    } else {
      return (
        <div />
      )
    }

  }
}

@withClickOut
class ContractFuncSelector extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  setFuncIndex = (i) => {
    this.props.setFuncIndex(i);
  }

  render() {
    const { funcList, selectedFuncIndex } = this.props;
    return (
      <div className="drop-box">
        <div className="drop-layer">
          <ul>
            {
              funcList.map((func, i) => {
                const isActive = isEqual(func, funcList[selectedFuncIndex]);
                return (
                  <li key={i} onClick={() => !isActive && this.setFuncIndex(i)} className={isActive ? 'on' : ''}>
                    <span className="a">{func.name}</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default ContractRunSection;
