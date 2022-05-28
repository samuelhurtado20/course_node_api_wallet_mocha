import db from '../../../../common/persistence/pg.persistence'
import { Subscription } from '../../domain/subscription'
import { SubscriptionRepository } from '../../subscription.repository'

export class SubscriptionPgRepository implements SubscriptionRepository {
  public async all (): Promise<Subscription[]> {
    const rows = await db.query('select * from wallet_subscription order by id desc')
    return rows.rows as Subscription[]
  }

  public async find (id: number): Promise<Subscription | null> {
    // const row = await connector.query(`select * from wallet_subscription where id = ${id} order by id desc`)
    const row = await db.query('select * from wallet_subscription where id = $1',
      [id])
    if (row.rows.length) {
      return row.rows[0] as Subscription
    }
    return null
  }

  public async findByUserAndCode (userId: number, code: string): Promise<Subscription | null> {
    const row = await db.query('select * from wallet_subscription where user_id = $1 and code = $2', [userId, code])
    if (row.rows.length) {
      return row.rows[0] as Subscription
    }
    return null
  }

  public async store (entry: Subscription): Promise<void> {
    await db.query('insert into wallet_subscription(user_id, code, amount, cron, created_at) values($1,$2,$3,$4,$5)',
      [entry.userId, entry.code, entry.amount, entry.cron, new Date()])
    // return rows as Subscription[]
  }

  public async update (entry: Subscription): Promise<void> {
    const now = new Date(Date.now())
    console.log(now)
    await db.query('update wallet_subscription set user_id = $1, code = $2, amount = $3, cron = $4, updated_at = $5 where id = $6',
      [entry.userId, entry.code, entry.amount, entry.cron, now, entry.id])
  }

  public async delete (id: Number): Promise<void> {
    await db.query('delete from wallet_subscription where id = $1',
      [id])
  }
}
