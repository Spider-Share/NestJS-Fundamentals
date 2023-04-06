import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI');
        return {
          uri,
          // connectionName: 'users',
        };
      },
    }),
    CoffeesModule,
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }



// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';

// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost/test', {
//       connectionName: 'cats',
//     }),
//     MongooseModule.forRoot('mongodb://localhost/users', {
//       connectionName: 'users',
//     }),
//   ],
// })
// export class AppModule {}