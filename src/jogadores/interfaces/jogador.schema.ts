import * as mongoose from 'mongoose';

export const jogadorSchema = new mongoose.Schema({
    telefoneCelular: {type:String , unique:true},
    email: {type:String, unique:true},
    nome: {type:String},
    ranking: {type:String},
    posicaoRanking: {type:String},
    urlFotoJogador: {type:Number}

}, {timestamps:true , collection: 'jogadores'} );