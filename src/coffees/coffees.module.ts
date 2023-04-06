/* CoffeesModule FINAL CODE */
import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './schemas/coffee.schema';
import { Event, EventSchema } from './schemas/events/event.schema';
import { COFFEE_BRANDS } from './constants/coffees.constants';



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
  providers: [
    CoffeesService,
    {
      provide: COFFEE_BRANDS, // 👈
      useValue: ['buddy brew', 'nescafe', 'pilao'] // array of coffee brands,
    },
  ],
  exports: [CoffeesService]
})
export class CoffeesModule { }