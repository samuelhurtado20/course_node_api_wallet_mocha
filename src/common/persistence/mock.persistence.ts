const db = {
  balance: [{
    id: 1,
    user_id: 1,
    amount: 100
  }],
  movements: [],
  subscription: [],
  _balanceId: 0,
  _movementId: 0,
  _subscriptionId: 0
}

db._balanceId = db.balance.length
db._movementId = db.movements.length
db._subscriptionId = db.subscription.length

export default db
