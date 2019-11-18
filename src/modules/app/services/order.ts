import { ConflictException, Injectable } from '@nestjs/common';
import { IOrder } from 'interfaces/models/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../respoitories/order';

@Injectable()
export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  public async save(model: IOrder): Promise<Order> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async update(model: IOrder): Promise<Order> {
    let order = await this.orderRepository.findById(model.id);

    if (!order) {
      throw new ConflictException('This order does not exists');
    }

    return this.orderRepository.update({ ...order, ...model });
  }

  private async create(model: IOrder): Promise<Order> {
    const user = await this.orderRepository.insert(model);

    return user;
  }
}
