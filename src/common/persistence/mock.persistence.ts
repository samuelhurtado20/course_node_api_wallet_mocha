const db = {
  balances: [{
    id: 1,
    userId: 1,
    amount: 100
  }],
  movements: [],
  subscriptions: [],
  _balanceId: 0,
  _movementId: 0,
  _subscriptionId: 0
}

db._balanceId = db.balances.length
db._movementId = db.movements.length
db._subscriptionId = db.subscriptions.length

export default db
