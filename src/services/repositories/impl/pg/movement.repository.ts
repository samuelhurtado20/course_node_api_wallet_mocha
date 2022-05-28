import db from '../../../../common/persistence/pg.persistence'
import { Movement } from '../../domain/movement'
import { MovementRepository } from '../../movement.repository'

export class MovementPgRepository implements MovementRepository {
  public async all (): Promise<Movement[]> {
    const rows = await db.query('select * from wallet_movement order by id desc')
    return rows.rows as Movement[]
  }

  public async find (id: number): Promise<Movement | null> {
    const row = await db.query('select * from wallet_movement where id = $1',
      [id])
    if (row.rows.length) {
      return row.rows[0] as Movement
    }
    return null
  }

  public async findByUserId (userId: number): Promise<Movement | null> {
    const row = await db.query('select * from wallet_movement where user_id = $1 and code = $2', [userId])
    if (row.rows.length) {
      return row.rows[0] as Movement
    }
    return null
  }

  public async store (entry: Movement): Promise<void> {
    const now = new Date(Date.now())
    await db.query('insert into wallet_movement(user_id, type, amount, created_at) values($1,$2,$3,$4)',
      [entry.userId, entry.type, entry.amount, now])
  }

  public async update (entry: Movement): Promise<void> {
    const now = new Date(Date.now())
    await db.query('update wallet_movement set user_id = $1, type = $2, amount = $3, updated_at = $4 where id = $5',
      [entry.userId, entry.type, entry.amount, now, entry.id])
  }

  public async delete (id: Number): Promise<void> {
    await db.query('delete from wallet_movement where id = $1',
      [id])
  }
}
