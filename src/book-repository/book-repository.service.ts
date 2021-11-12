import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IBookRepository } from './book-repository.interface';
import {
  BookRepository,
  BookRepositoryDocument,
} from './book-repository.mongoose-model';
import admin from 'firebase-admin';

@Injectable()
export class BookRepositoryService {
  constructor(
    @InjectModel(BookRepository.name)
    private BookRepositoryModel: Model<BookRepositoryDocument>,
    @InjectConnection() private Connection: Connection
  ) {}

  async create(Book: IBookRepository): Promise<BookRepositoryDocument> {
    const book = new this.BookRepositoryModel(Book);

    return await book.save();
  }

  async findAll(): Promise<BookRepositoryDocument[]> {
    const book = await this.BookRepositoryModel.find().exec();

    return book;
  }

  async update(
    id: string,
    data: IBookRepository
  ): Promise<BookRepositoryDocument> {
    console.log(id);
    const book = await this.BookRepositoryModel.findOneAndUpdate(
      { _id: id },
      data
    ).exec();

    return book;
  }

  async delete(id: string): Promise<BookRepositoryDocument> {
    const book = await this.BookRepositoryModel.findByIdAndDelete(id).exec();

    return book;
  }

  async createRD(Book: IBookRepository): Promise<any> {
    const db = admin.database();
    const book = await db.ref('bookRepository').push(Book);
    return book;
  }

  async getAllRD(): Promise<any> {
    const db = admin.database();
    const books = await db.ref('bookRepository').once('value');
    return books;
  }

  async getIDRD(id: string): Promise<any> {
    console.log(id);
    const db = admin.database();
    const book = await db.ref('bookRepository').child(id).once('value');
    console.log(book);
    return book;
  }

  async createFD(Book: IBookRepository): Promise<any> {
    const dbFS = admin.firestore();
    const book = await dbFS.collection('bookRepository').add(Book);
    return book;
  }

  async getAllFD(): Promise<any> {
    const dbFS = admin.firestore();
    const books = await dbFS.collection('bookRepository').get();
    return books;
  }

  async getIDFD(id: string): Promise<any> {
    const dbFS = admin.firestore();
    const book = await dbFS.collection('bookRepositort').doc(id).get();
    return book;
  }
}
