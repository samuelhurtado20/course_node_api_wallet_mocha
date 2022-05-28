import { MovementType } from '../common/enums/movement-type'
import { ApplicationException } from '../common/exceptions/application.exception'
import { MovementCreateDto } from '../interfaces/dtos/movement.dto'
import { IBalanceRepository } from '../interfaces/repositories/balance.repository'
import { Balance } from '../interfaces/models/balance'
import { Movement } from '../interfaces/models/movement'
import { IMovementRepository } from '../interfaces/repositories/movement.repository'

export class MovementService {
  constructor (
        private readonly movementRepository: IMovementRepository,
        private readonly balanceRepository: IBalanceRepository
  ) { }

  public async find (id: number): Promise<Movement | null> {
    return await this.movementRepository.find(id)
  }

  public async all (): Promise<Movement[]> {
    return await this.movementRepository.all()
  }

  public async store (entry: MovementCreateDto): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(entry.userId)

    if (entry.type === MovementType.income) {
      await this.income(entry, balance)
    } else if (entry.type === MovementType.outcome) {
      await this.outcome(entry, balance)
    } else {
      throw new ApplicationException('Invalid movement type supplied.')
    }
  }

  private async income (entry: MovementCreateDto, balance: Balance | null) {
    if (!balance) {
      await this.balanceRepository.store({
        amount: entry.amount,
        userId: entry.userId
      } as Balance)
    } else {
      balance.amount += entry.amount
      await this.balanceRepository.update(balance)
    }

    await this.movementRepository.store(entry as Movement)
  }

  private async outcome (entry: MovementCreateDto, balance: Balance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User does not have enough balance.')
    } else {
      balance.amount -= entry.amount
      await this.balanceRepository.update(balance)
      await this.movementRepository.store(entry as Movement)
    }
  }
}
