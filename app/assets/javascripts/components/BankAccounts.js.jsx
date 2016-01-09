class BankAccounts extends React.Component{
  constructor(props){
    super(props);
    this.fetchBankAccounts = this.fetchBankAccounts.bind(this);
    this.newAccount = this.newAccount.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
    this.state = { bankAccounts: [], netCalculation: 0 };
  }
  componentDidMount(){
    this.fetchBankAccounts();
  }
  fetchBankAccounts(){  
    $.ajax({
      url: '/bank_accounts',
      type: 'GET'
    }).success( data => {
      this.setState( { bankAccounts: data.bankAccounts });
    });
    $.ajax({
      url: '/net_calculation',
      type: 'GET'
    }).success( data => {
      this.setState({ netCalculation: data });
    }).error( data => {
      console.log(data);
    });
  }
  newAccount(){
    $.ajax({
      url: '/bank_accounts',
      type: 'POST',
      data: { bank_account: {name: this.refs.accountName.value, money: this.refs.accountBalance.value } }
    }).success( data => {
      let bankAccounts = this.state.bankAccounts;
      bankAccounts.unshift(data.bankAccount);
      this.refs.accountName.value = null;
      this.refs.accountBalance.value = null;
      this.setState({ bankAccounts: bankAccounts});
    }).error( data => {
      console.log(data)
    });
  }
  deleteAccount(id){
    $.ajax({
      url: '/bank_accounts/' + id,
      type: 'DELETE'
    }).success( data =>{
      this.fetchBankAccounts();
    }).error(data => {
      console.log(data);
    });
  }
  break_even(){
    const BREAK_EVEN = 0
    if (this.state.netCalculation > BREAK_EVEN){
      return(<div className='col s10 offset-s1 green'>
              <h4 className='center'>Net Balance: ${this.state.netCalculation}</h4>
            </div>);
    } else {
      return(<div className='col s10 offset-s1 red'>
              <h4 className='center'>Net Balance: ${this.state.netCalculation}</h4>
            </div>);
    }
  }
  render(){
    let bankAccounts = this.state.bankAccounts.map( bankAccount => {
      let key = `bankAccount-${bankAccount.id}`;
      return (<BankAccount key={key} deleteAccount={this.deleteAccount} fetchBankAccounts={this.fetchBankAccounts} {...bankAccount} />)
    });
    return(<div>
            {this.break_even()}
            <div className=''>
              <div className='col s10 offset-s1 m5 offset-m1'>
                <form onSubmit={this.newAccount}>
                  <h3 className='center'>Add Account</h3>
                  <input type='text' placeholder="Account Name" ref='accountName' autoFocus={true} />
                  <input type='number' placeholder='Account Balance' ref='accountBalance' />
                  <button type='submit' className='btn waves-effect waves-light'>Save</button>
                </form>
                <div>
                </div>
                <div>
                  <h1 className='center'>Bank Accounts</h1>
                  <hr />
                  {bankAccounts}
                </div>
              </div>
            </div>
           </div>);
  }
}