import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/providers/guards/jwtAuth.guard';
import { JoiValidationPipe } from 'src/providers/pipe/JoiValidationPipe';
import { JoiUserScheme } from './JoiValidation/Joi.User.Scheme';
import { IUser } from './user.interface';
import { UserDocument } from './user.mongoose-model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('sign-up')
  @UsePipes(new JoiValidationPipe(JoiUserScheme))
  async createUser(@Body() User: IUser): Promise<UserDocument> {
    return this.UsersService.create(User);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUser(): Promise<UserDocument[]> {
    return this.UsersService.getAllUser();
  }

  @Post('sign-in')
  @UsePipes(new JoiValidationPipe(JoiUserScheme))
  async signIn(@Body() User: IUser): Promise<string> {
    return this.UsersService.signIn(User);
  }
}
