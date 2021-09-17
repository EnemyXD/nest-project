import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookRepositoryModule } from './book-repository/book-repository.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    BookRepositoryModule,
    MongooseModule.forRoot(process.env.SERVER_PORT),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
