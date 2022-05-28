export interface SubscriptionCreateDto{
    code: string,
    userId:number,
    amount:number,
    cron:string
}

export interface SubscriptionUpdateDto{
    code: string,
    amount:number,
    cron:string
}
