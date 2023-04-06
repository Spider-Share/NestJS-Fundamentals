import { Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeMoedl } from './models/coffee.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Coffee, CoffeeDocument } from './schemas/coffee.schema';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectModel(Coffee.name) private readonly coffeeModel: Model<CoffeeDocument>,
    ) { }

    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeModel
          .find()
          .skip(offset) 
          .limit(limit)
          .exec();
      }

    async findOne(id: string): Promise<CoffeeMoedl> {
        const coffee = await this.coffeeModel.findOne({ _id: id }).exec();
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto): Promise<CoffeeMoedl> {
        const coffee = new this.coffeeModel(createCoffeeDto);
        return coffee.save();
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto): Promise<CoffeeMoedl> {
        const existingCoffee = await this.coffeeModel
            .findOneAndUpdate({ _id: id }, { $set: updateCoffeeDto }, { new: true })
            .exec();

        if (!existingCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return existingCoffee;
    }

    async remove(id: string): Promise<CoffeeMoedl> {
        const coffee = await this.coffeeModel.findByIdAndRemove(id).exec();;
        if (!coffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }
}
