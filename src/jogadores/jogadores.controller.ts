import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { criarJogadorDto } from './dtos/criar-jogador.dto';
import { JodadoresService } from './jogadores.service';
import { Jogador } from './interfaces/jogador.interface';

@Controller('api/v1/jogadores')
export class JogadoresController {
    constructor(
        private readonly JogadorService:JodadoresService
    ){}

    @Post('')
    async criarAtualizarJogador(@Body() dto: criarJogadorDto){
        await this.JogadorService.criarAtualizarJogador(dto);

    }

    @Get('')
    async consultarJogadores(@Query('email') email:string): Promise<Jogador[] | Jogador>{

        if(email){
            return await this.JogadorService.consultarJogadoresPeloEmail(email)
        }else{
            return await this.JogadorService.consultarTodosJogadores()
        }
       
    }

    @Delete()
    async deletarJogador(@Query('email') email:string):Promise <void>{
        this.JogadorService.deletarJogador(email);
    }

    
}
