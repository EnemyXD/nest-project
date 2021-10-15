import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookRepositoryModule } from './book-repository/book-repository.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    BookRepositoryModule,
    MongooseModule.forRoot(process.env.DB_HOST, {
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      dbName: 'book-repository',
      useFindAndModify: false,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
