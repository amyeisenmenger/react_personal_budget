class Bills extends React.Component{
  constructor(props){
    super(props);
    this.newBill = this.newBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
    this.state = ({bills: [], showEdit: false });
  }
  componentDidMount(){
    this.fetchBills();
  }
  fetchBills(){
    $.ajax({
      url: '/bills',
      type: 'GET'
    }).success( data => {
      this.setState({ bills: data.bills });
    }).error( data => {
      console.log(data);
    });
  }
  newBill(){
    $.ajax({
      url: '/bills',
      type: 'POST',
      data: {bill: {name: this.refs.billName.value, category: this.refs.billCategory.value, amount: this.refs.billAmount.value, due_date: this.refs.billDueDate.value}}
    }).success(data => {
      let bills = this.state.bills;
      bills.unshift(data.bill);
      this.refs.billName.value = null;
      this.refs.billCategory.value = null;
      this.refs.billAmount.value = null;
      this.refs.billDueDate.value = null;
      this.setState({bills: bills})
    }).error( data=> {
      console.log(data)
    });
  }
  deleteBill(id){
    $.ajax({
      url: '/bills/' + id,
      type: 'DELETE'
    }).success( data => {
      this.fetchBills();
    }).error( data => {
      console.log(data);
    });
  }
  render(){
    let bills = this.state.bills.map( bill => {
      let key=`bill-${bill.id}`;
      if(this.state.showEdit){
      return this.showEditForm();
    } else {
      return(<Bill key={key} deleteBill={this.deleteBill} fetchBills={this.fetchBills} {...bill}/>);
    }
    });
    return(<div className=''>
            <div className='col s10 offset-s1 m5'>
              <form onSubmit={this.newBill}>
                <h3>Add a Bill</h3>
                <input type='text' placeholder='Bill Name' ref='billName' />
                <input type='text' placeholder='Bill Category' ref='billCategory' />
                <input type='number' placeholder='Amount' ref='billAmount' />
                <input type='date' placeholder='Due On' ref='billDueDate' />
                <button type='submit' className='btn waves-effect waves-light'>Add</button>
              </form>
              <div>
                <h1 className='center'>Current Bills</h1>
                <hr />
                {bills}
              </div>
            </div>
           </div>);
  }
}