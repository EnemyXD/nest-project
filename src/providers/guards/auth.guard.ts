import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { User, UserDocument } from 'src/users/user.mongoose-model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard {
  constructor(
    @InjectConnection() private Connection: Connection,
    @InjectModel(User.name) private UserModel: Model<UserDocument>
  ) {}
  async validateUser(login: string) {
    const user = await this.UserModel.findOne({ login: login }).exec();
    if (!user) throw new ForbiddenException();
    return user;
  }
}
