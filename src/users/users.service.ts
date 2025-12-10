import { ConflictException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/db/prisma.service'
import { createHash } from 'src/utils/crypt'
import type { CreateUserDto } from './dto/create-user.dto'
import type { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
  constructor(private readonly model: PrismaService) {}

  private async validateEmail(email: string) {
    const user = await this.model.user.findUnique({
      where: { email },
    })
    return !!user
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.validateEmail(createUserDto.email)) {
      throw new ConflictException('Email already in use')
    }

    const { password } = createUserDto

    const hashedPassword = await createHash(password)

    const user = await this.model.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    })

    return { user }
  }

  findAll() {
    return this.model.user.findMany()
  }

  findOne(id: string) {
    return this.model.user.findUnique({
      where: { id },
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.model.user.update({
      where: { id },
      data: updateUserDto,
    })
  }

  remove(id: string) {
    return this.model.user.delete({
      where: { id },
    })
  }
}
