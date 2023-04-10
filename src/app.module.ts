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
// import * as Joi from 'joi';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    //  para o .env funcionar precisa do ConfigModule.forRoot()
    // MongooseModule.forRoot(process.env.MONGO_URI), // comunicação normal 
    
    ConfigModule.forRoot({
      load: [appConfig], // 👈
    }),
    // ConfigModule.forRoot({
    //   validationSchema: Joi.object({
    //     MONGO_URI: Joi.string().required(),
    //     MONGO_PORT: Joi.number().default(process.env.PORT || +process.env.MONGO_PORT).required(), // testar no servidor
    //   }),
    // }),
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
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const val1 = process.env.TESTE_NUMBER
    const val2 = +process.env.TESTE_NUMBER
    const val3 =  process.env.PORT
    const val4=   process.env.NODE_ENV
    console.log(typeof val1 + ' ' + val1)
    console.log(typeof val2 + ' ' + val2)
    console.log(typeof val3 + ' ' + val3)
    console.log(typeof val4 + ' ' + val4)

  }

}



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