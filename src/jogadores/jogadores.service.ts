import { BadRequestException, Injectable , InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { criarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { atualizarJogadorDto } from "./dtos/atualizar-jogador.dto";



@Injectable()
export class JodadoresService{

    private jogadores: Jogador[] = [];

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel:Model<Jogador>
    ){}

    private readonly logger = new Logger(JodadoresService.name)

    async criarJogador(dto: criarJogadorDto): Promise<Jogador> {
        const { email, telefoneCelular } = dto;

        const jogadorComMesmoEmail = await this.jogadorModel.findOne({ email }).exec();
        if (jogadorComMesmoEmail) {
            throw new BadRequestException(`Jogador com o e-mail ${email} já está cadastrado`);
        }

        const jogadorComMesmoTelefone = await this.jogadorModel.findOne({ telefoneCelular }).exec();
        if (jogadorComMesmoTelefone) {
            throw new BadRequestException(`Jogador com o número ${telefoneCelular} já está cadastrado`);
        }

        const jogadorCriado = new this.jogadorModel(dto);
        return await jogadorCriado.save();
    }


    async atualizarJogador(dto: atualizarJogadorDto, _id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

        if (!jogadorEncontrado) {
            throw new BadRequestException(`Jogador com id: ${_id} não encontrado`);
        }

        const jogadorAtualizado = await this.jogadorModel.findOneAndUpdate(
            { _id },
            { $set: dto },
            { new: true }
        ).exec();

        if (!jogadorAtualizado) {
            throw new InternalServerErrorException(`Erro ao atualizar jogador com id: ${_id}`);
        }

        return jogadorAtualizado;
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        

        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloId(_id:string):Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if(jogadorEncontrado){
            return jogadorEncontrado
        }else{
            throw new NotFoundException(`Jogador com E-mail ${_id} não foi encontrado`)
        }
    }

    async deletarJogador(_id: string): Promise<any> {
        return await this.jogadorModel.findOneAndDelete({_id}).exec()
    }
    
}