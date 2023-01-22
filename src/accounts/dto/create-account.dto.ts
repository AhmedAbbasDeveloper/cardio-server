import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  creditLimit: number;
}
