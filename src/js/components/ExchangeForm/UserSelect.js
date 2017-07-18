import React from "react"
import { connect } from "react-redux"
import { selectAccount } from "../../actions/exchangeFormActions"


@connect((store, props) => {
  return {
    accounts: Object.keys(store.accounts.accounts).map((key) => {
      return {
        address: store.accounts.accounts[key].address,
        name: store.accounts.accounts[key].name,
      };
    }),
    selectedAccount: store.exchangeForm.selectedAccount,
    error: store.exchangeForm.errors["selectedAccountError"],
  }
})
export default class UserSelect extends React.Component {

  selectAccount(event) {
    this.props.dispatch(selectAccount(
      event.target.value
    ))
  }

  render() {
    var userOptions = this.props.accounts.map((acc, index) => {
      return <option key={acc.address} value={acc.address}>{acc.name}</option>
    })
    var error = ""
    if (this.props.error && this.props.error != "") {
      error = (<div class="error">
        <i class="k-icon k-icon-error"></i>
        Selected address is {this.props.error}
      </div>)
    }
    return (
      <div class="input-group-item input-account">
        <label>Exchange from</label>
        <div class="input-item">
          <input value={this.props.selectedAccount} type="text" disabled />
          <div class="select-wrapper">
            <select class="selectric" id="from-account" value={this.props.selectedAccount} onChange={this.selectAccount.bind(this)}>
              <option key="1" value="">No account selected</option>
              {userOptions}
            </select>
          </div>
        </div>
        { error }
      </div>)
  }
}
