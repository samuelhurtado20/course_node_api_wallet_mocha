import { Balance } from './domain/balance'

export interface BalanceRepository{

    all(): Promise<Balance[]>

    find(id: number): Promise<Balance | null>

    findByUserId(userId: number): Promise<Balance | null>

    store(entry: Balance): Promise<void>

    update(entry: Balance): Promise<void>

    delete(id: Number): Promise<void>
}
