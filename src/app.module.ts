import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://matsonjunior194:WguVmWR8NYpiJBav@cluster0.ufeyknh.mongodb.net/?retryWrites=true&w=majority&appName=smartranking'),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
