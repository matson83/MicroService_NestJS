import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { criarJogadorDto } from './dtos/criar-jogador.dto';
import { JodadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipes } from './pipes/jogadores-validacao-parametros.pipe';
import { atualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(
        private readonly JogadorService:JodadoresService
    ){}

    @Post('')
    @UsePipes(ValidationPipe)
    async criarJogador(@Body() dto: criarJogadorDto): Promise<Jogador>{
        return await this.JogadorService.criarJogador(dto);

    }

    @Patch('/:_id')
    @UsePipes(ValidationPipe)
    async AtualizarJogador(@Body() dto: atualizarJogadorDto , @Param('_id', JogadoresValidacaoParametrosPipes)  _id : string):Promise<Jogador>{
       return await this.JogadorService.atualizarJogador(dto,_id);

    }

    @Get('')
    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.JogadorService.consultarTodosJogadores();
    }

    
    @Get('/:_id')
    async consultarJogadorPeloId(
        @Param('_id', JogadoresValidacaoParametrosPipes) _id: string,
    ): Promise<Jogador> {
        return await this.JogadorService.consultarJogadoresPeloId(_id);
    }


    @Delete('/:_id')
    async deletarJogador(@Param('_id' , JogadoresValidacaoParametrosPipes) _id : string):Promise <void>{
        this.JogadorService.deletarJogador(_id);
    }

    
}
