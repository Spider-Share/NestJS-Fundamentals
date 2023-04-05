import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get()
    findAll(@Res() response) {
        // return 'This action returns all coffees';
        response.status(200).send('This action returns all coffees');

    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns #${id} coffee`;
    }

    // @Get(':id/:id2')
    // findOne(@Param() paramns) { // dessa porma pego todos os parametros
    //     // http://localhost:3000/coffees/testeId/testeId2
    //     console.log(paramns) // { id: 'testeId', id2: 'testeId2' }
    //     return `This action returns coffee`;
    // }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body;
        // return `This action creates a coffee`;
    }


    @Patch(':id') // patch atualiza apenas uma parte do objeto
    // @Put() substitui todos os recursos, dessa forma eu preciso de todo objeto para atualizar 
    update(@Param('id') id: string, @Body() body) {
        return `This action updates #${id} coffee`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes #${id} coffee`;
    }

}
