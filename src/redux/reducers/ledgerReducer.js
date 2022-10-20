import actionTypes from 'redux/actionTypes/actionTypes'
import update from 'react-addons-update';

const initialState = {
  isLedger: false,
  ledgerWallet: {},
  isLedgerConfirmed: false,
  ledgerSignedRawTx: ''
}

export function ledgerReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.setLogInStateForLedger: {
      return Object.assign({}, state, {
        isLedger: action.payload.isLoggedIn,
        ledgerWallet: {
          ...action.payload.ledgerWallet,
          tokens: {},
          type: 'icx',
          balanceLoading: false,
        }
      })
    }
    case actionTypes.confirmLedger: {
      return Object.assign({}, state, {
        isLedgerConfirmed: true,
        ledgerSignedRawTx: action.payload
      })
    }
    case actionTypes.resetLedgerReducer:
    case actionTypes.resetEXTRInputReducer:
      return Object.assign({}, state, {
        isLedgerConfirmed: false,
        ledgerSignedRawTx: ''
      })
    case actionTypes.updateLedgerWalletBalance:
        return Object.assign({}, state, {
          ledgerWallet: {
            ...state.ledgerWallet,
            balanceLoading: true
          }
        })
    case actionTypes.updateLedgerWalletBalanceFulfilled:
      const newLedgerWallet = {
        ...state.ledgerWallet,
        balance: action.balance,
        balanceLoading: false,
      }
      return Object.assign({}, state, {
        ledgerWallet: newLedgerWallet
      })
    case actionTypes.addTokenFulfilledForLedger:
      const tokenObj = Object.assign({}, state.ledgerWallet.tokens, action.payload)
      return update(state, {
        ledgerWallet: {
          tokens: { $set: tokenObj }
        }
      })
    case actionTypes.fetchTokenBalanceFulfilledForLedger:
      return update(state, {
        ledgerWallet: {
          tokens: {
            [action.address]: {
              balance: { $set: action.balance }
            }
          }
        }
      })
    case actionTypes.resetSelectedWallet:
    case actionTypes.resetPRepIissReducer:
    case actionTypes.resetEXTRPageReducer:
      return Object.assign({}, initialState)
    default:
      return state
  }
}
