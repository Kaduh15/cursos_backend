import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email of the user',
    type: String,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password of the user',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
