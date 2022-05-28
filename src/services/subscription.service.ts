import { ApplicationException } from '../common/exceptions/application.exception'
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../interfaces/dtos/subscription.dto'
import { Subscription } from '../interfaces/models/subscription'
import { SubscriptionPgRepository } from '../repositories/pg/subscription.repository'

export class SubscriptionService {
  constructor (private readonly subscriptionRepository: SubscriptionPgRepository) { }

  public async all (): Promise<Subscription[]> {
    return await this.subscriptionRepository.all()
  }

  public async find (id: number): Promise<Subscription | null> {
    return await this.subscriptionRepository.find(id)
  }

  public async findByUserAndCode (userId: number, code: string): Promise<Subscription | null> {
    return await this.subscriptionRepository.findByUserAndCode(userId, code)
  }

  public async store (entry: SubscriptionCreateDto): Promise<void> {
    // console.log(entry)
    const originalEntry = await this.subscriptionRepository.findByUserAndCode(entry.userId, entry.code)
    // console.log(originalEntry)
    if (!originalEntry) {
      await this.subscriptionRepository.store(entry as Subscription)
    } else {
      throw new ApplicationException('User subscription already exists.')
    }
  }

  public async update (id: number, entry: SubscriptionUpdateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id)

    if (originalEntry) {
      originalEntry.code = entry.code
      originalEntry.amount = entry.amount
      originalEntry.cron = entry.cron
      await this.subscriptionRepository.update(originalEntry)
    } else {
      throw new ApplicationException('User subscription already exists.')
    }
  }

  public async remove (id: number): Promise<void> {
    return await this.subscriptionRepository.delete(id)
  }
}
