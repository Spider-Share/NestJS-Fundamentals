/* CoffeesModule FINAL CODE */
import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './schemas/coffee.schema';
import { Event, EventSchema } from './schemas/events/event.schema';
import { COFFEE_BRANDS } from './constants/coffees.constants';
import { Connection } from 'mongoose';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe', 'pilao']
  }
}




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
    ]),
    ConfigModule.forFeature(coffeesConfig) /* Partial Registration of coffees namespaced configuration */
  ],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    
    // {
    //   provide: COFFEE_BRANDS, // 👈
    //   useValue: ['buddy brew', 'nescafe', 'pilao'] // array of coffee brands,
    // },
    {
      provide: COFFEE_BRANDS, // 👈
      useFactory: () => ['buddy brew', 'nescafe', 'pilao'], // array of coffee brands,
      scope: Scope.TRANSIENT
    },

    // {
    //   provide: COFFEE_BRANDS, // não está funcionando verificar
    //   useFactory: (brandsFactory: CoffeeBrandsFactory) => 
    //   brandsFactory.create(),
    //   inject: [CoffeeBrandsFactory]
    // },
    // {
    //   provide: COFFEE_BRANDS,
    //   // Note "async" here, and Promise/Async event inside the Factory function 
    //   // Could be a database connection / API call / etc
    //   // In our case we're just "mocking" this type of event with a Promise
    //   useFactory: async (connection: Connection): Promise<string[]> => {
    //     // const coffeeBrands = await connection.query('SELECT * ...');
    //     const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe', 'pilao'])
    //     return coffeeBrands;
    //   },
    //   // inject: [Connection],
    //   inject: [],
    // },
  ],
  exports: [CoffeesService]
})
export class CoffeesModule { }