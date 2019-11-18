import { Injectable } from '@nestjs/common';
import { IOrder } from 'interfaces/models/order';
import { IPaginationParams } from 'interfaces/pagination';
import { Order } from 'modules/database/models/order';
import { Page, Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).findById(id);
  }

  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Order>> {
    let query = Order.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'id') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('id', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }
}
