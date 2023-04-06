import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CoffeeMoedl } from './models/coffee.model';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Coffee, CoffeeDocument } from './schemas/coffee.schema';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Event, EventDocument } from './schemas/events/event.schema';
import { COFFEE_BRANDS } from './constants/coffees.constants';

@Injectable()
export class CoffeesService {

    constructor(
        @InjectModel(Coffee.name) private readonly coffeeModel: Model<CoffeeDocument>,
        @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
        @InjectConnection() private readonly connection: Connection, // For Transactions
        @Inject(COFFEE_BRANDS) coffeeBrands: string[]
    ) { 
        // console.log('connection connection',connection) // Pega toda a conecção do mongoose
        console.log('coffeeBrands coffeeBrands',coffeeBrands)
    }

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


    async recommendCoffee(coffee: Coffee) {
        const session = await this.connection.startSession();
        session.startTransaction(); // Transactions process

        try {
            coffee.recommendations++;

            const recommendEvent = new this.eventModel({
                name: 'recommend_coffee',
                type: 'coffee',
                payload: { coffeeId: coffee.id },
            });
            await recommendEvent.save({ session });
            await coffee.save({ session });

            await session.commitTransaction();
        } catch (err) {
            await session.abortTransaction();
        } finally {
            session.endSession();
        }
    }
}
