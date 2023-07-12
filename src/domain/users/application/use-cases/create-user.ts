import { User } from '../../enterprise/entities/user'
import { UsersRepository } from '../repositories/users-repository'

interface CreateUserUseCaseRequest {
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  phone: string
  roles?: string[]
  permissions?: string[]
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    firstName,
    lastName,
    birthDate,
    email,
    phone,
    roles,
    permissions,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = User.create({
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      roles,
      permissions,
    })

    await this.usersRepository.create(user)

    return {
      user,
    }
  }
}
