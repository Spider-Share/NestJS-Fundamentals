import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService) { }

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
    @Get()
    findAll(@Query() paginationQuery) {
        // const { limit, offset } = paginationQuery;
        return this.coffeesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id);
    }

    @Post()
    create(@Body() createCoffeeDto:CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto:UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }

}
