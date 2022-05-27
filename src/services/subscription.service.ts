import { ApplicationException } from "../common/exceptions/application.exception";
import { SubscriptionCreateDto, SubscriptionUpdateDto } from "../dtos/subscription.dto";
import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionPgRepository } from "./repositories/impl/pg/subscription.repository";

export class SubscriptionService {
    constructor(private readonly subscriptionRespository: SubscriptionPgRepository) { }

    public async all(): Promise<Subscription[]> {
        return await this.subscriptionRespository.all()
    }

    public async find(id: number): Promise<Subscription | null> {
        return await this.subscriptionRespository.find(id)
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> {
        return await this.subscriptionRespository.findByUserAndCode(user_id, code)
    }

    public async store(entry: SubscriptionCreateDto): Promise<void> {
        const originalEntry = await this.subscriptionRespository.findByUserAndCode(entry.user_id, entry.code)

        if (!originalEntry) {
            await this.subscriptionRespository.store(entry as Subscription)
        }
        else {
            throw new ApplicationException('User subscription already exists.')
        }
    }

    public async update(id: number, entry: SubscriptionUpdateDto): Promise<void> {
        const originalEntry = await this.subscriptionRespository.find(id)

        if (originalEntry) {
            originalEntry.code = entry.code
            originalEntry.amount = entry.amount
            originalEntry.cron = entry.cron
            //await this.subscriptionRespository.update(originalEntry)
        }
        else {
            throw new ApplicationException('User subscription already exists.')
        }
    }

    public async remove(id: number): Promise<void> {
        return await this.subscriptionRespository.dalete(id)
    }
}