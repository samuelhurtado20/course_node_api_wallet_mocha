import express from "express";
import { createContainer, asClass } from 'awilix'
import { TestService } from './services/test.service'
import { scopePerRequest } from "awilix-express";
import { SubscriptionPgRepository } from "./services/repositories/impl/pg/subscription.repository";
import { SubscriptionService } from "./services/subscription.service";

export default (app: express.Application) => {
    const container = createContainer({ injectionMode: 'CLASSIC' })

    container.register({
        // repositories
        subscriptionRepository: asClass(SubscriptionPgRepository).scoped(),

        // services
        subscriptionService: asClass(SubscriptionService).scoped(),
        testService: asClass(TestService).scoped()
    })

    app.use(scopePerRequest(container))
}