import { GET, route, POST } from 'awilix-express'
import { Request, Response } from 'express'
import { BaseController } from '../common/controllers/base.controller'
import { ApplicationException } from '../common/exceptions/application.exception'
import { MovementCreateDto } from '../dtos/movement.dto'
import { MovementService } from '../services/movement.service'

@route('/movements')
export class MovementController extends BaseController {
  constructor (private readonly movementService: MovementService) { super() }

    @GET()
  public async all (req: Request, res: Response) {
    try {
      res.send(
        await this.movementService.all()
      )
    } catch (err) {
      this.handleException(err, res)
    }
  }

    @route('/:id')
    @GET()
    public async find (req: Request, res: Response) {
      try {
        const row = await this.movementService.find(parseInt(req.params.id))

        if (row) { res.status(200).send(row) } else { res.status(404).send(new ApplicationException('Element not found.')) }
      } catch (err) {
        this.handleException(err, res)
      }
    }

    @POST()
    public async store (req: Request, res: Response) {
      try {
        await this.movementService.store({
          type: req.body.type,
          amount: req.body.amount,
          userId: req.body.user_id
        } as MovementCreateDto)

        res.send()
      } catch (err) {
        this.handleException(err, res)
      }
    }
}
