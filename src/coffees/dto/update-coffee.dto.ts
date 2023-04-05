// npm i @nestjs/mapped-types esse pacote me ajuda a duplicar o update-coffee.dto e evitar código repitido
// O Nest fornece a PartialType()função de utilitário para facilitar essa tarefa e minimizar o clichê.
import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}

// PartialType seta de forma opcional da mesma forma que o elvis operator ?

// export class UpdateCoffeeDto  { não preciso duplicar
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
//   }
  
