import db from '../../common/persistence/pg.persistence'
import { IBalanceRepository } from '../../interfaces/repositories/balance.repository'
import { Balance } from '../../interfaces/models/balance'

export class BalancePgRepository implements IBalanceRepository {
  public async all (): Promise<Balance[]> {
    const rows = await db.query('select * from wallet_balance order by id desc')
    return rows.rows as Balance[]
  }

  public async find (id: number): Promise<Balance | null> {
    const row = await db.query('select * from wallet_balance where id = $1',
      [id])
    if (row.rows.length) {
      return row.rows[0] as Balance
    }
    return null
  }

  public async findByUserId (userId: number): Promise<Balance | null> {
    const row = await db.query('select * from wallet_balance where user_id = $1', [userId])
    if (row.rows.length) {
      return row.rows[0] as Balance
    }
    return null
  }

  public async store (entry: Balance): Promise<void> {
    const now = new Date(Date.now())
    await db.query('insert into wallet_balance(user_id, amount, created_at) values($1,$2,$3)',
      [entry.userId, entry.amount, now])
  }

  public async update (entry: Balance): Promise<void> {
    const now = new Date(Date.now())
    await db.query('update wallet_balance set user_id = $1, amount = $2, updated_at = $3 where id = $4',
      [entry.userId, entry.amount, now, entry.id])
  }

  public async delete (id: Number): Promise<void> {
    await db.query('delete from wallet_balance where id = $1',
      [id])
  }
}
