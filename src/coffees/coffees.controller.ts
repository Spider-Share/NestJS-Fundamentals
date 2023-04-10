import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';
@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService,      
                @Inject(REQUEST) private request: Request // pesa a aplicação saber usar // 
                                                          // Singleton recomendado   @Injectable({ scope: Scope.DEFAULT })             
                ) { }

    // @Get()
    // findAll(@Query() paginationQuery) {
    //   const { limit, offset } = paginationQuery;
    // //http://localhost:3000/coffees?limit=0&offset=1 { limit: '0', offset: '1' }
    // //   console.log(paginationQuery)
    //   return `This action returns all coffees. limit: ${limit}, offset: ${offset}`;
    // }


    // // @Get()
    // // findAll(@Res() response) {
    // //     // return 'This action returns all coffees';
    // //     response.status(200).send('This action returns all coffees');

    // // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return `This action returns #${id} coffee`;
    // }

    // // @Get(':id/:id2')
    // // findOne(@Param() paramns) { // dessa porma pego todos os parametros
    // //     // http://localhost:3000/coffees/testeId/testeId2
    // //     console.log(paramns) // { id: 'testeId', id2: 'testeId2' }
    // //     return `This action returns coffee`;
    // // }

    // @Post()
    // @HttpCode(HttpStatus.GONE)
    // create(@Body() body) {
    //     return body;
    //     // return `This action creates a coffee`;
    // }


    // @Patch(':id') // patch atualiza apenas uma parte do objeto
    // // @Put() substitui todos os recursos, dessa forma eu preciso de todo objeto para atualizar 
    // update(@Param('id') id: string, @Body() body) {
    //     return `This action updates #${id} coffee`;
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return `This action removes #${id} coffee`;
    // }


    // class Creating a Basic Service
    @Public() // public Authorization2
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
        // const { limit, offset } = paginationQuery;
        // await new Promise(resolve => setTimeout(resolve, 5000)); // testando TimeoutInterceptor
        return this.coffeesService.findAll(paginationQuery);
    }

    // @Get(':id')
    // findOne(@Param('id') id: number) {
    //     console.log(typeof id)
    //     /*  app.useGlobalPipes(new ValidationPipe({ transform: true, }));
    //         sem o transform: true o console continua retornando o ID como string  https://learn.nestjs.com/courses/591712/lectures/23192392
    //     */
    //     return this.coffeesService.findOne('' + id);
    // }

    @Public()
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        console.log('sssssssssssssssss',id)
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        console.log(createCoffeeDto instanceof CoffeesController)
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }

}
