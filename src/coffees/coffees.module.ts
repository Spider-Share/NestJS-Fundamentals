/* CoffeesModule FINAL CODE */
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './schemas/coffee.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Coffee.name,
      schema: CoffeeSchema
    }])
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule { }