class Bill extends React.Component{
  constructor(props){
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.updateBill = this.updateBill.bind(this);
    this.showEditForm = this.showEditForm.bind(this);
    this.state = {showEdit: false };
  }
  toggleEdit(){
    this.setState({ showEdit: !this.state.showEdit})
  }
  updateBill(id){
    $.ajax({
      url: '/bills/' + id,
      type: 'PUT',
      data: {id: this.props.id, bill: {name: this.refs.updateBillName.value, category: this.refs.updateBillCategory.value, amount: this.refs.updateBillAmount.value, due_date: this.refs.updateBillDueDate.value} }
    }).success( data => {
      this.toggleEdit();
      this.props.fetchBills();
    }).error( data => {
      console.log(data);
    })
  }
  showEditForm(){
    return(<div>
            <form onSubmit={() => this.updateBill(this.props.id)}>
              <h3>Update Bill</h3>
                <input type='text' autoFocus={true} placeholder='Bill Name' defaultValue={this.props.name} ref='updateBillName' />
                <input type='text' placeholder='Bill Category' defaultValue={this.props.category} ref='updateBillCategory' />
                <input type='number' placeholder='Amount' defaultValue={this.props.amount} ref='updateBillAmount' />
                <input type='date' placeholder='Due On'  defaultValue={this.props.dueDate} ref='updateBillDueDate' />
                <button type='submit' className='btn waves-effect waves-light'>Save</button>
            </form>
      </div>);
  }
 showBill(){
    return(<div className='card blue-grey darken-1'>
            <div className='card-content white-text' onClick={() => this.toggleEdit()}>
              <h4>{this.props.name}</h4>
              <h4>Amount: ${this.props.amount}</h4>
              <h5>Category: {this.props.category}</h5>
              <h5>Due On: {this.props.dueDate}</h5>
            </div>
            <div className='card-action'>
              <a onClick={() => this.props.deleteBill(this.props.id)}>Delete</a>
            </div>
           </div>);
  }
  render(){
    if(this.state.showEdit){
      return this.showEditForm();
    } else {
      return this.showBill();
    }
  }
}