import connector from '../../../../common/persistence/pg.persistence'
import { Subscription } from '../../domain/subscription'
import { SubscriptionRepository } from '../../subscription.repository'

export class SubscriptionPgRepository implements SubscriptionRepository {
    public async all(): Promise<Subscription[]> {
        const rows = await connector.execute('select * from wallet_subscription order by id desc')
        return rows as Subscription[]
    }

    public async find(id: number): Promise<Subscription | null> {
        //const row = await connector.execute(`selet * from wallet_subscription where id = ${id} order by id desc`)
        const row: any[] = await connector.execute('selet * from wallet_subscription where id = ?', [id])
        if (row.length) {
            return row[0] as Subscription
        }
        return null
    }
    
    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        const row: any[] = await connector.execute('selet * from wallet_subscription where user_id = ? and code = ?', [user_id, code])
        if (row.length) {
            return row[0] as Subscription
        }
        return null
    }
    
    public async store(entry: Subscription): Promise<void> {
        const rows = await connector.execute('insert into wallet_subscription(user_id, code, amount, cron, created_at) values(?,?,?,?,?)',
            [entry.user_id, entry.code, entry.amount, entry.cron, new Date()])
        //return rows as Subscription[]
    }

    public async update(entry: Subscription): Promise<void> {
        const rows = await connector.execute('update wallet_subscription set user_id = ?, code=?, amount= ?, cron=?, updated_at=? where id = ?',
            [entry.user_id, entry.code, entry.amount, entry.cron, new Date(), entry.id])
    }

    public async dalete(id: Number): Promise<void> {
        const rows = await connector.execute('delete from wallet_subscription where id = ?',
            [id])
    }

}