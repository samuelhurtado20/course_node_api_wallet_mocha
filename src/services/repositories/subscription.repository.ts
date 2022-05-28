import { Subscription } from './domain/subscription'

export interface SubscriptionRepository{

    all(): Promise<Subscription[]>

    find(id: number): Promise<Subscription | null>

    store(entry: Subscription): Promise<void>

    update(entry: Subscription): Promise<void>

    delete(id: Number): Promise<void>

    findByUserAndCode(user_id: number, code: string): Promise<Subscription | null>
}
