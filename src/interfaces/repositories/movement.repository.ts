import { Movement } from '../models/movement'

export interface IMovementRepository {

    all(): Promise<Movement[]>

    find(id: number): Promise<Movement | null>

    // findByUserId(userId: number): Promise<Movement | null>

    store(entry: Movement): Promise<void>

    update(entry: Movement): Promise<void>

    delete(id: Number): Promise<void>
}
