export interface SubscriptionCreateDto{
    code: string,
    user_id:number,
    amount:number,
    cron:string
}

export interface SubscriptionUpdateDto{
    code: string,
    amount:number,
    cron:string
}