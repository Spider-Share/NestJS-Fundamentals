import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports:[
    DatabaseModule.register('mongodb://localhost/users'),
    CoffeesModule
  ],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
