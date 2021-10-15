import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IUser } from './user.interface';
import { User, UserDocument } from './user.mongoose-model';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private Connection: Connection,
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>
  ) {}

  async create(User: IUser): Promise<UserDocument> {
    const user = await new this.UserModel(User);

    return user.save();
  }

  async getAllUser(): Promise<UserDocument[]> {
    const users = await this.UserModel.find().exec();

    return users;
  }

  async findByLogin(login: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ login: login }).exec();

    return user;
  }

  async signIn(User: IUser): Promise<string> {
    const user = await this.findByLogin(User.login);
    if (!user) throw new ForbiddenException();
    if (User.password !== user.password) throw new ForbiddenException();
    return jwt.sign({ login: user.login }, 'jwt');
  }
}
