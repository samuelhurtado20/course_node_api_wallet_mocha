import db from '../../common/persistence/mysql.persistence'
import { Movement } from '../../interfaces/models/movement'
import { IMovementRepository } from '../../interfaces/repositories/movement.repository'

export class MovementMysqlRepository implements IMovementRepository {
  public async all (): Promise<Movement[]> {
    const [rows]:any[] = await db.query('select * from wallet_movement order by id desc')
    return rows as Movement[]
  }

  public async find (id: number): Promise<Movement | null> {
    const [rows]:any[] = await db.query('select * from wallet_movement where id = $1',
      [id])
    if (rows.length) {
      return rows[0] as Movement
    }
    return null
  }

  public async findByUserId (userId: number): Promise<Movement | null> {
    const [rows]:any[] = await db.query('select * from wallet_movement where user_id = $1', [userId])
    if (rows.length) {
      return rows[0] as Movement
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
