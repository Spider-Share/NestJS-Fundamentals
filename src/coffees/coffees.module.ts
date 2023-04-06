/* CoffeesModule FINAL CODE */
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './schemas/coffee.schema';
import { Event, EventSchema } from './schemas/events/event.schema';



@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Coffee.name,
        schema: CoffeeSchema
      },
      {
        name: Event.name,
        schema: EventSchema
      }
    ])
  ],
  controllers: [CoffeesController],
  providers: [CoffeesService]
})
export class CoffeesModule { }