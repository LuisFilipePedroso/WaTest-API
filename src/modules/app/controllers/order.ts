import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { Order } from 'modules/database/models/order';

import { OrderService } from '../services/order';
import { SaveValidator } from '../validators/order/save';

@ApiUseTags('Admin: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async save(@Body() model: SaveValidator) {
    return this.orderService.save(model);
  }
}
