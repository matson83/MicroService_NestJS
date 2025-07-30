import { IsNotEmpty, IsOptional } from "class-validator";

export class atualizarJogadorDto{
    @IsOptional()
    @IsNotEmpty()
    telefoneCelular:string;

    @IsOptional()
    @IsNotEmpty()
    email:string

    @IsOptional()
    @IsNotEmpty()
    nome:string

}