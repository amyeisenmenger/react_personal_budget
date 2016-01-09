json.bills @bills do |bill|
  json.id bill.id
  json.name bill.name
  json.category bill.category
  json.amount bill.amount
  json.dueDate bill.due_date
  json.url bill_url(bill)
end