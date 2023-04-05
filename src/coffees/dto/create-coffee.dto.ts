import { IsString } from 'class-validator'; 

export class CreateCoffeeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true }) // cada valor tem que ser string
  readonly flavors: string[];
}