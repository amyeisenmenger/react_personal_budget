class BankAccountsController < ApplicationController
  def index
    @bank_accounts = BankAccount.all
  end

  def create
    @bank_account = BankAccount.create(bank_account_params)
    render 'bank_account'
  end
  
  def update
    @bank_account = BankAccount.find(params[:id])
    @bank_account.update(bank_account_params)
    render 'bank_account'
  end
  
  def destroy
    BankAccount.find(params[:id]).destroy
    head :ok
  end

  def net_calculation
    @bank_accounts = BankAccount.all
    @bank_account_total = 0.0
    @bills = Bill.all
    @bill_total = 0.0

    @bank_accounts.each do |bank_account|
      @bank_account_total += bank_account.money || 0
    end
    
    @bills.each do |bill|
      @bill_total += bill.amount || 0
    end

    @net = @bank_account_total - @bill_total
    render json: @net
  end

  private
  def bank_account_params
    params.require(:bank_account).permit(:name, :money)
  end
end
