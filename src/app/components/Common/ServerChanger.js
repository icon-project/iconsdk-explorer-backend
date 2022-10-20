import React, { Component } from 'react';
import { getCurrentServer, getCustomIcxServer} from 'constants/config.js'
import withClickOut from 'HOC/withClickOut';
import { checkURLSuffix } from 'utils';

const INIT_STATE = {
  showCustomInput: getCurrentServer('icx') === 'custom',
  customNetName: getCustomIcxServer().customNetName,
  customWalletURL: getCustomIcxServer().customWalletURL,
  customTrackerURL: getCustomIcxServer().customTrackerURL,
  customNid: getCustomIcxServer().customNid
}

// style
const ulStyle = {
  position: 'absolute',
  top: '6px',
  right: '110px',
  display: 'inline-block'
}
const liStyle = {
  'float': 'left',
  'margin': '0 20px 0 0',
}
const spanStyle = {
  display: 'block',
  fontSize: '10px',
  textAlign: 'center',
  marginTop: '0px',
  color: '#888'
}

const inputUlStyle = {
  position: 'absolute',
  right: '250px',
  top: '8px'
}

const inputLiStyle = {
  float: 'left',
  marginRight: '20px'
}

const inputButtonStyle = {
  background: 'none',
  border: '1px dotted #777',
  borderRadius: '2px',
  width: '45px',
  height: '20px',
  fontSize: '11px',
  color: '#888',
  padding: 0,
  marginTop: 6,
  cursor: 'pointer'
}

class ServerChanger extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;

    const customIcxServer = {
      customNetName: "icx",
      customWalletURL: checkURLSuffix("https://wallet.icon.foundation/api/v3"),
      customNid: "0x1"
    }

    let names = {};
    if (localStorage.getItem("serverNames")) {
      names = JSON.parse(localStorage.getItem("serverNames"));
    }
    names["custom"] = "custom";
    names["icx"] = "icx";
    localStorage.setItem("serverNames", JSON.stringify(names));
    this.state.serverNames = names;
    // this.setState({
    //   ...this.state,
    //   serverNames: names
    // });

    let icxServers = {};
    if (localStorage.getItem("icxServers")) {
      icxServers = JSON.parse(localStorage.getItem("icxServers"));
    }
    icxServers[customIcxServer.customNetName] = customIcxServer;
    localStorage.setItem("icxServers", JSON.stringify(icxServers));

    if(localStorage.getItem("icxServer") === null || localStorage.getItem("icxServer") === undefined) {
      localStorage.setItem("icxServer", "icx");
    } else {
      let icxServer = icxServers[localStorage.getItem("icxServer")];
      localStorage.setItem('customIcxServer', JSON.stringify(icxServer));
    }
  }

  changeServer = (index, coinType) => {
    if (index === 'custom') {
      this.setState({
        showCustomInput: true
      })
      return;
    }
    localStorage.setItem(`icxServer`, index);

    let icxServers = localStorage.getItem('icxServers');
    let icxServer =  JSON.parse(icxServers)[index];
    localStorage.setItem('customIcxServer', JSON.stringify(icxServer));

    window.location.reload();
  }

  handleChangeInput = (e) => {
    const target = e.target.getAttribute('data-name');
    const newState = { ...this.state }
    newState[target] = e.target.value
    this.setState(newState)
  }

  setCustomURL = () => {
    const { customNetName, customWalletURL, customNid } = this.state;
    const customIcxServer = {
      customNetName: customNetName,
      customWalletURL: checkURLSuffix(customWalletURL),
      customNid: customNid
    }
    if(customNetName === (undefined || "") || customWalletURL === (undefined || "") || customNid === (undefined || "") ) {
      return false;
    }

    let names = this.state.serverNames;
    if(localStorage.getItem("serverNames")) {
      names = JSON.parse(localStorage.getItem("serverNames"));
    }
    names[customNetName] = customNetName;
    localStorage.setItem("serverNames", JSON.stringify(names));
    this.state.serverNames = names;
    // this.setState({
    //   ...this.state,
    //   serverNames: names
    // });

    // TODO set ICX Server
    let icxServers = {};
    if(localStorage.getItem("icxServers")) {
      icxServers = JSON.parse(localStorage.getItem("icxServers"));
    }
    icxServers[customNetName] = customIcxServer;
    localStorage.setItem("icxServers", JSON.stringify(icxServers));
    localStorage.setItem('customIcxServer', JSON.stringify(customIcxServer));
    localStorage.setItem("icxServer", customNetName);

    window.location.reload();
  }

  render() {
    const { showCustomInput, customNetName, customWalletURL, customNid } = this.state;
    const { I18n } = this.props;
    return (
      <div>
        {
          showCustomInput && (
            <ul style={inputUlStyle}>
              <li style={inputLiStyle}><input type="text" placeholder="ex) icx" data-name='customNetName' style={{width: "100px"}} onChange={this.handleChangeInput} value={customNetName} /><span style={spanStyle}>Net. Name</span></li>
              <li style={inputLiStyle}><input type="text" placeholder="ex) https://xyz:3000" data-name='customWalletURL' style={{width: "300px"}} onChange={this.handleChangeInput} value={customWalletURL} /><span style={spanStyle}>Wallet URL</span></li>
              <li style={inputLiStyle}><input type="text" placeholder="ex) 0x1" data-name='customNid' style={{width: "50px"}} onChange={this.handleChangeInput} value={customNid} /><span style={spanStyle}>NID</span></li>
              <li style={inputLiStyle}><button style={inputButtonStyle} onClick={this.setCustomURL}>{I18n.button.add}</button></li>
            </ul>
          )
        }
        <ul style={ulStyle}>
          <li
            style={liStyle}>
            <ComboBox
              width={72}
              list = {this.state.serverNames}
              index={showCustomInput ? 'custom' : getCurrentServer('icx')}
              setIndex={(index) => this.changeServer(index, 'icx')}
            />
            <span style={spanStyle}>SERVER</span>
          </li>
        </ul>
      </div>
    );
  }
}


class ComboBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: false
    }
  }

  toggleList = () => {
    if (this.props.disabled) {
      return
    }
    this.setState({
      showList: !this.state.showList
    })
  }

  setIndex = (index) => {
    if (typeof this.props.setIndex === 'function') {
      this.props.setIndex(index)
    }
  }

  render() {
    const { width } = this.props
    return (
      <span style={{
        border: '1px dotted #545454',
        padding: 2,
        width: width,
        display: 'block',
        textAlign: 'center',
        fontSize: '11px',
        color: '#9e9e9e'
      }} className={`money-group ${this.props.disabled ? 'disabled' : ''}`} onClick={this.toggleList}>
        {this.props.index ? this.props.list[this.props.index].toUpperCase() : '    '}
        {
          !this.props.noArrow && (
            <em className="_img"></em>
          )
        }
        <div
          style={{
            position: 'absolute',
            bottom: '44px',
            width: width,
            marginLeft: '-3px'
          }}
          className="layer typeB">
          {this.state.showList &&
            <CurrencyList
              {...this.props}
              onClickOut={this.toggleList}
              setIndex={this.setIndex}
            />
          }
        </div>
      </span>
    )
  }
}

@withClickOut
class CurrencyList extends Component {
  render() {
    const list = this.props.list ? Object.values(this.props.list) : []
    const listKey = this.props.list ? Object.keys(this.props.list) : []
    return (
      <ul>
        {list.map((c, i) => {
          return <li style={{
            background: '#333',
            borderTop: '1px solid #555',
            padding: '4px',
            color: '#b1b1b1'
          }}
            key={i} className={listKey[i] === this.props.index ? 'on' : ''} onClick={this.props.setIndex.bind(this, listKey[i])}><span>{c.toUpperCase()}</span></li>
        })}
      </ul>
    )
  }
}

export default ServerChanger;
