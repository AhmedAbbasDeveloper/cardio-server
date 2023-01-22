import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from './user.schema';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    const lowerCaseEmail = email.toLowerCase();
    return this.userModel.findOne({ email: lowerCaseEmail });
  }

  async create({
    firstName,
    lastName,
    email,
    password,
  }: CreateUserDto): Promise<UserDocument> {
    const lowerCaseEmail = email.toLowerCase();
    return this.userModel.create({
      firstName,
      lastName,
      email: lowerCaseEmail,
      password,
    });
  }
}
