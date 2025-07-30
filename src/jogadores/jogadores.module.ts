import { Module } from '@nestjs/common';
import { JogadoresController } from './jogadores.controller';
import { JodadoresService } from './jogadores.service';
import { MongooseModule} from '@nestjs/mongoose';
import { jogadorSchema } from './interfaces/jogador.schema';

@Module({
  imports: [
  MongooseModule.forFeature([
    { name: 'Jogador', schema: jogadorSchema }
  ])
],
  controllers: [JogadoresController],
  providers: [JodadoresService]
})
export class JogadoresModule {}
