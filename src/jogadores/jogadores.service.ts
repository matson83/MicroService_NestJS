import { Injectable , Logger, NotFoundException } from "@nestjs/common";
import { criarJogadorDto } from "./dtos/criar-jogador.dto";
import { Jogador } from "./interfaces/jogador.interface";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class JodadoresService{

    private jogadores: Jogador[] = [];

    constructor(
        @InjectModel('Jogador') private readonly jogadorModel:Model<Jogador>
    ){}

    private readonly logger = new Logger(JodadoresService.name)

    async criarAtualizarJogador(dto: criarJogadorDto): Promise<Jogador> {
        const {email} = dto
        // const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
          return await this.atualizar(dto)
        }else{
            return await this.criar(dto);
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        
        // return await this.jogadores;

        return await this.jogadorModel.find().exec();
    }

    async consultarJogadoresPeloEmail(email:string):Promise<Jogador>{

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if(jogadorEncontrado){
            return jogadorEncontrado
        }else{
            throw new NotFoundException(`Jogador com E-mail ${email} não foi encontrado`)
        }
    }

    async deletarJogador(email: string): Promise<Jogador> {
        const jogador = await this.jogadorModel.findOneAndDelete({ email }).exec();

        if (!jogador) {
            throw new Error(`Jogador com email ${email} não encontrado`);
        }

        return jogador;
    }

    private async criar(dto:criarJogadorDto): Promise<Jogador>{

        const jogadorCriado = new this.jogadorModel(dto);

        return await jogadorCriado.save();

        // const { nome , email , telefoneCelular} = dto

        // const jogador:Jogador = {
        //     _id:uuidv4(),
        //     nome,
        //     email,
        //     telefoneCelular,
        //     posicaoRanking: 1,
        //     ranking: 'A',
        //     urlFotoJogador: "www.google.com.br/foto123.jpg"
        // }

        // this.jogadores.push(jogador)
        // this.logger.log(`CriajogadorDTO: ${JSON.stringify(jogador)}`);
    }

    private async atualizar(dto: criarJogadorDto): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel
            .findOneAndUpdate({ email: dto.email }, { $set: dto }, { new: true })
            .exec();

        if (!jogadorEncontrado) {
            throw new Error('Jogador não encontrado para atualização');
        }

        return jogadorEncontrado;

        // const { nome } = dto;
        // jogadorEncontrado.nome = nome;
    }
    
}