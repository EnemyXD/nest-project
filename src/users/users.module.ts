import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthGuard } from 'src/providers/guards/auth.guard';
import { JwtStrategy } from 'src/providers/guards/Jwt.strategy';
import { User, UserSchema } from './user.mongoose-model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthGuard, JwtStrategy],
})
export class UsersModule {}
