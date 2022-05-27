import { GET, route } from "awilix-express";
import { Request, Response } from "express";
import { SubscriptionService } from "../services/subscription.service";

@route('/')
export class SubscriptionController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @GET()
    public index(req: Request, res: Response): void {
        res.send('Running...')
    }
}