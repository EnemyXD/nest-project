import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookRepositoryModule } from './book-repository/book-repository.module';

@Module({
  imports: [BookRepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
