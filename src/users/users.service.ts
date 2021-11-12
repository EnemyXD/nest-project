import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { IUser } from './user.interface';
import { User, UserDocument } from './user.mongoose-model';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { salt } from './bcrypt/genSalt';

@Injectable()
export class UsersService {
  constructor(
    @InjectConnection() private Connection: Connection,
    @InjectModel(User.name)
    private UserModel: Model<UserDocument>
  ) {}

  async create(User: IUser): Promise<UserDocument | string> {
    console.log(User);
    const createdUser = await this.UserModel.findOne({ login: User.login });
    if (createdUser) return 'login is busy';
    const hash = bcrypt.hashSync(User.password, salt);
    const user = await new this.UserModel({
      login: User.login,
      password: hash,
    });
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
    if (!bcrypt.compareSync(User.password, user.password))
      throw new ForbiddenException();
    return jwt.sign({ login: user.login }, 'jwt');
  }

  async deleteUser(_id: string): Promise<boolean> {
    const user = await this.UserModel.findOne({ _id });
    if (!user) throw new NotFoundException('user not found');
    await this.UserModel.deleteOne({ _id });
    return true;
  }
}
