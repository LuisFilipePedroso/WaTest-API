import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../respoitories/order';
import { ListValidator } from '../validators/order/list';

@ApiUseTags('Admin: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderRepository: OrderRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() model: ListValidator) {
    return this.orderRepository.list(model);
  }
}
