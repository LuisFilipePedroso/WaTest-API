import { ApiModelProperty } from '@nestjs/swagger';
import { IOrder } from 'interfaces/models/order';
import { Model } from 'objection';

export class Order extends Model implements IOrder {
  @ApiModelProperty({ type: 'integer' })
  public id?: number;
  @ApiModelProperty({ type: 'string' })
  public description: string;
  @ApiModelProperty({ type: 'number' })
  public quantity: number;
  @ApiModelProperty({ type: 'number' })
  public value: number;
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  public createdDate?: Date;
  @ApiModelProperty({ type: 'string', format: 'date-time' })
  public updatedDate?: Date;

  public static get tableName(): string {
    return 'Orders';
  }

  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatDatabaseJson(json: any): any {
    json = Model.prototype.$formatDatabaseJson.call(this, json);
    return json;
  }

  // public $parseDatabaseJson(json: any): any {
  //   json.roles = json.roles ? json.roles.split(',') : [];
  //   return Model.prototype.$formatDatabaseJson.call(this, json);
  // }
}
