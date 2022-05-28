import { MovementType } from '../../common/enums/movement-type'

export interface MovementCreateDto {
    type: MovementType
    userId: number
    amount: number
}
