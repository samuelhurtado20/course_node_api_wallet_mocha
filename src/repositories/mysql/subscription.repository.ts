import db from '../../common/persistence/mysql.persistence'
import { Subscription } from '../../interfaces/models/subscription'
import { ISubscriptionRepository } from '../../interfaces/repositories/subscription.repository'

export class SubscriptionMysqlRepository implements ISubscriptionRepository {
  public async all (): Promise<Subscription[]> {
    const [rows] = await db.execute('select * from wallet_subscription order by id desc')
    return rows as Subscription[]
  }

  public async find (id: number): Promise<Subscription | null> {
    const [rows]: any[] = await db.execute('select * from wallet_subscription where id = ?',
      [id])
    if (rows.length) {
      return rows[0] as Subscription
    }
    return null
  }

  public async findByUserAndCode (userId: number, code: string): Promise<Subscription | null> {
    const [rows]:any[] = await db.execute('select * from wallet_subscription where user_id = ? and code = ?', [userId, code])
    if (rows.length) {
      return rows[0] as Subscription
    }
    return null
  }

  public async store (entry: Subscription): Promise<void> {
    await db.execute('insert into wallet_subscription(user_id, code, amount, cron, created_at) values(?,?,?,?,?)',
      [entry.userId, entry.code, entry.amount, entry.cron, this.GetDateFormat()])
    // return rows as Subscription[]
  }

  public async update (entry: Subscription): Promise<void> {
    // const now = new Date(Date.now())
    // await db.execute('update wallet_subscription set user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ?, created_at = ? where id = ?',
    //  [entry.userId, entry.code, entry.amount, entry.cron, now, entry.created_at, entry.id])
    const query = `update wallet_subscription set code = '${entry.code}', amount = '${entry.amount}', cron = '${entry.cron}', updated_at = '${this.GetDateFormat()}' where id = ${entry.id}`

    await db.query(query)
  }

  public async delete (id: Number): Promise<void> {
    await db.execute('delete from wallet_subscription where id = ?',
      [id])
  }

  private GetDateFormat () {
    const date = new Date()
    return date.toISOString().slice(0, 19).replace('T', ' ')
  }
}
