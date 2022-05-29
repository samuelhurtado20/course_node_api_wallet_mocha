import db from '../../common/persistence/mock.persistence'
import { Subscription } from '../../interfaces/models/subscription'
import { ISubscriptionRepository } from '../../interfaces/repositories/subscription.repository'

export class SubscriptionMockRepository implements ISubscriptionRepository {
  public async all (): Promise<Subscription[]> {
    const table = db.subscription as Subscription[]
    return Object.assign([...table])
  }

  public async find (id: number): Promise<Subscription | null> {
    const table = db.subscription as Subscription[]
    const result = table.find(x => x.id === id)
    if (result) {
      return Object.assign({ ...result })
    }

    return null
  }

  public async findByUserAndCode (userId: number, code: string): Promise<Subscription | null> {
    const table = db.subscription as Subscription[]
    const result = table.find(x => x.id === userId && x.code === code)
    if (result) {
      return Object.assign({ ...result })
    }

    return null
  }

  public async store (entry: Subscription): Promise<void> {
    const table = db.subscription as Subscription[]

    db._subscriptionId++
    table.push({
      id: db._subscriptionId,
      code: entry.code,
      userId: entry.userId,
      amount: entry.amount,
      cron: entry.cron,
      created_at: new Date(),
      updated_at: null
    } as Subscription)
  }

  public async update (entry: Subscription): Promise<void> {
    const table = db.subscription as Subscription[]

    const original = table.find(x => x.id === entry.id)

    if (original) {
      original.code = entry.code
      original.userId = entry.userId
      original.amount = entry.amount
      original.cron = entry.cron
      original.updated_at = new Date()
    }
  }

  public async delete (id: Number): Promise<void> {
    const table = db.subscription as Subscription[]
    db.subscription = table.filter(x => x.id === id) as any
  }
}
