json.bankAccounts @bank_accounts do |bank_account|
  json.id bank_account.id
  json.name bank_account.name
  json.money bank_account.money
end