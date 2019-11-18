import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength, IsNumber } from 'class-validator';
import { IOrder } from 'interfaces/models/order';

export class SaveValidator implements IOrder {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiModelProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @ApiModelProperty({ required: true, type: 'string', minLength: 3, maxLength: 255 })
  public description: string;

  @IsNotEmpty()
  @IsInt()
  @ApiModelProperty({ required: true, type: 'integer' })
  public quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiModelProperty({ required: true, type: 'number' })
  public value: number;
}
