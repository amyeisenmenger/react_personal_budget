class BankAccount extends React.Component{
  constructor(props){
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateAccount = this.updateAccount.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.showBankAccount = this. showBankAccount.bind(this);
    this.state = {showEdit: false}
  }
  toggleEdit(){
    this.setState({showEdit: !this.state.showEdit})
  }
  updateAccount(id){
    $.ajax({
      url: '/bank_accounts/' + id,
      type: 'PUT',
      data: {id: this.props.id, bank_account: {name: this.refs.updateAccountName.value, money: this.refs.updateAccountBalance.value}}
    }).success( data => {
      this.toggleEdit();
      this.props.fetchBankAccounts();
    }).error( data => {
      debugger
      console.log(data)
    });
  }
  showEditForm(){
    return(<div>
            <form onSubmit={() => this.updateAccount(this.props.id)}>
              <h3 className='center'>Add Account</h3>
              <input type='text' placeholder="Account Name" defaultValue={this.props.name} autoFocus={true} ref='updateAccountName' />
              <input type='number' placeholder='Account Balance' defaultValue={this.props.money} ref='updateAccountBalance' />
              <button type='submit' className='btn waves-effect waves-light'>Save</button>
            </form>
          </div>);
  }
  showBankAccount(){
    return(<div className='card blue-grey darken-1'>
            <div className='card-content white-text' onClick={this.toggleEdit}>
              <h3>{this.props.name}</h3>
              <h4>Total: ${this.props.money}</h4>
            </div>
            <div className='card-action'>
              <a onClick={() => this.props.deleteAccount(this.props.id)}>Delete</a>
            </div>
           </div>);
  }
  render(){
    if(this.state.showEdit){
      return this.showEditForm();
    } else {
      return this.showBankAccount();
    }
  }
}