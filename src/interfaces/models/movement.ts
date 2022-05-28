import { MovementType } from '../../common/enums/movement-type'

export interface Movement {
    id: number
    userId: number
    type: MovementType
    amount: number
    created_at: Date | null
    updated_at: Date | null
}
