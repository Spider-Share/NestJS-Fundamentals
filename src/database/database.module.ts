import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CoffeeMoedl } from 'src/coffees/models/coffee.model';

@Module({})
export class DatabaseModule {
    
    static register(options: any): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: MongooseModule.forRoot(''),
                }
            ]
        }
    }
}

// // https://stackoverflow.com/questions/67340588/nestjs-how-to-register-dynamic-module-provider-multiple-times-using-different


// import { DynamicModule, Module } from '@nestjs/common';
// import { Knex, knex } from 'knex';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { Logger } from 'winston';

// export const KNEX_MODULE = 'KNEX_MODULE';

// @Module({})
// export class KnexModule {
//     static register(token: string, options: Knex.Config): DynamicModule {
//         return {
//             module: KnexModule,
//             providers: [
//                 {
//                     inject: [WINSTON_MODULE_PROVIDER],
//                     provide: token,
//                     useFactory: (logger: Logger) => {
//                         logger.info('Creating new knex instance', {
//                             context: KnexModule.name,
//                             tags: ['instance', 'knex', 'create'],
//                         });
//                         return knex(options);
//                     },
//                 },
//             ],
//             exports: [token],
//         };
//     }
// }



// @Injectable()
// export class CatRepository implements Repository<Cat> {
//     // eslint-disable-next-line no-useless-constructor
//     public static KNEX_TOKEN = 'KNEX_CATS_TOKEN';

//     // eslint-disable-next-line no-useless-constructor
//     constructor(
//         @Inject(CatRepository.KNEX_TOKEN)
//         protected knex: Knex,
//     ) { }

//   ..


