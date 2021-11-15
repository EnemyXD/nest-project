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

  private FScollection = 'bookRepository';

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
    const book = await db.ref(this.FScollection).push(Book);
    return book;
  }

  async getAllRD(): Promise<any> {
    const db = admin.database();
    const books = await db.ref(this.FScollection).once('value');
    return books;
  }

  async getIDRD(id: string): Promise<any> {
    const db = admin.database();
    const book = await db.ref(this.FScollection).child(id).once('value');
    return book;
  }

  async updateRD(id: string, Book: IBookRepository): Promise<any> {
    const db = admin.database();
    const book = await db.ref(this.FScollection).child(id).update(Book);
    return book;
  }

  async deleteRD(id: string): Promise<any> {
    const db = admin.database();
    const book = await db.ref(this.FScollection).child(id).remove();
    return book;
  }

  async createFD(Book: IBookRepository): Promise<any> {
    const dbFS = admin.firestore();
    const book = await dbFS.collection(this.FScollection).add(Book);
    const res = {
      id: book.id,
    };
    return res;
  }

  async getAllFD(): Promise<any> {
    const dbFS = admin.firestore();
    const books = await dbFS.collection(this.FScollection).get();
    const res = [];
    books.forEach((doc) => {
      const book = {
        id: doc.id,
        data: doc.data(),
      };
      res.push(book);
    });
    return res;
  }

  async getIDFD(id: string): Promise<any> {
    const dbFS = admin.firestore();
    const book = await dbFS.collection(this.FScollection).doc(id).get();
    const res = {
      data: book.data(),
    };
    return res;
  }

  async updateFD(id: string, Book: IBookRepository): Promise<any> {
    const dbFS = admin.firestore();
    const book = await dbFS.collection(this.FScollection).doc(id);
    const UpdatedBook = await book.update(Book);
    return UpdatedBook;
  }

  async deleteFD(id: string): Promise<any> {
    const dbFS = admin.firestore();
    const book = await dbFS.collection(this.FScollection).doc(id).delete();
    return book;
  }
}
