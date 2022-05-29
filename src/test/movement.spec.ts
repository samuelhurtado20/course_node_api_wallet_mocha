/* eslint-disable no-undef */
import assert = require('assert');
import { MovementCreateDto } from '../interfaces/dtos/movement.dto'
import { BalanceMockRepository } from '../repositories/mock/balance.repository'
import { MovementMockRepository } from '../repositories/mock/movement.repository'
import { MovementService } from '../services/movement.service'

const movementService = new MovementService(
  new MovementMockRepository(),
  new BalanceMockRepository()
)

describe('Movement.Service', () => {
  describe('Store', () => {
    it('tries to register an income movement', async () => {
      await movementService.store({
        userId: 1,
        type: 0,
        amount: 200
      } as MovementCreateDto)
    })

    it('tries to register an outcome movement', async () => {
      await movementService.store({
        userId: 1,
        type: 1,
        amount: 100
      } as MovementCreateDto)
    })

    it('tries to register an outcome movement with insufficient balance', async () => {
      try {
        await movementService.store({
          userId: 1,
          type: 1,
          amount: 200
        } as MovementCreateDto)
      } catch (error: any) {
        assert.equal(error.message, 'User does not have enough balance.')
      }
    })

    it('tries to register an unexpected movement', async () => {
      try {
        await movementService.store({
          userId: 1,
          type: 99,
          amount: 200
        } as unknown as MovementCreateDto)
      } catch (error: any) {
        assert.equal(error.message, 'Invalid movement type supplied.')
      }
    })
  })
})
