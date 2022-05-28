import db from '../../common/persistence/mysql.persistence'
import { Subscription } from '../../interfaces/models/subscription'
import { ISubscriptionRepository } from '../../interfaces/repositories/subscription.repository'

export class SubscriptionMysqlRepository implements ISubscriptionRepository {
  public async all (): Promise<Subscription[]> {
    const [rows] = await db.execute('select * from wallet_subscription order by id desc')
    return rows as Subscription[]
  }

  public async find (id: number): Promise<Subscription | null> {
    const [rows]: any[] = await db.execute('select * from wallet_subscription where id = $1',
      [id])
    if (rows.length) {
      return rows[0] as Subscription
    }
    return null
  }

  public async findByUserAndCode (userId: number, code: string): Promise<Subscription | null> {
    const [rows]:any[] = await db.execute('select * from wallet_subscription where user_id = $1 and code = $2', [userId, code])
    if (rows.length) {
      return rows[0] as Subscription
    }
    return null
  }

  public async store (entry: Subscription): Promise<void> {
    await db.execute('insert into wallet_subscription(user_id, code, amount, cron, created_at) values($1,$2,$3,$4,$5)',
      [entry.userId, entry.code, entry.amount, entry.cron, new Date()])
    // return rows as Subscription[]
  }

  public async update (entry: Subscription): Promise<void> {
    const now = new Date(Date.now())
    await db.execute('update wallet_subscription set user_id = $1, code = $2, amount = $3, cron = $4, updated_at = $5 where id = $6',
      [entry.userId, entry.code, entry.amount, entry.cron, now, entry.id])
  }

  public async delete (id: Number): Promise<void> {
    await db.execute('delete from wallet_subscription where id = $1',
      [id])
  }
}
