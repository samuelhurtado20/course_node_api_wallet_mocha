import { GET, route, POST, PUT, DELETE } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { ApplicationException } from '../common/exceptions/application.exception'
import { SubscriptionCreateDto, SubscriptionUpdateDto } from '../dtos/subscription.dto'
import { SubscriptionService } from '../services/subscription.service'

@route('/subscriptions')
export class SubscriptionController extends BaseController {
  constructor (private readonly subscriptionService: SubscriptionService) { super() }

    @GET()
  public async all (req: Request, res: Response) {
    try {
      res.send(
        await this.subscriptionService.all()
      )
    } catch (err) {
      this.handleException(err, res)
    }
  }

    @route('/:id')
    @GET()
    public async find (req: Request, res: Response) {
      try {
        const row = await this.subscriptionService.find(parseInt(req.params.id))

        if (row) { res.status(200).send(row) } else { res.status(404).send(new ApplicationException('Element not found.')) }
      } catch (err) {
        this.handleException(err, res)
      }
    }

    @POST()
    public async store (req: Request, res: Response) {
      try {
        await this.subscriptionService.store({
          userId: req.body.user_id,
          code: req.body.code,
          amount: req.body.amount,
          cron: req.body.cron
        } as SubscriptionCreateDto)

        res.send()
      } catch (err) {
        this.handleException(err, res)
      }
    }

    @route('/:id')
    @PUT()
    public async update (req: Request, res: Response) {
      try {
        await this.subscriptionService.update(parseInt(req.params.id), {
          // user_id: req.body.user_id,
          code: req.body.code,
          amount: req.body.amount,
          cron: req.body.cron
        } as SubscriptionUpdateDto)

        res.send()
      } catch (err) {
        this.handleException(err, res)
      }
    }

    @route('/:id')
    @DELETE()
    public async remove (req: Request, res: Response) {
      try {
        await this.subscriptionService.remove(parseInt(req.params.id))
        res.send()
      } catch (err) {
        this.handleException(err, res)
      }
    }
}
