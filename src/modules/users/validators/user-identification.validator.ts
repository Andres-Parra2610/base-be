import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "src/repositories/users/users.repository";

@Injectable()
export class UserIdentificationValidator {

  constructor(
    private readonly userRepository: UserRepository,
  ) { }

  async execute(identityDocument: string, email?: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [
        { identityDocument },
        { email: email || '' }
      ]
    });
    if (user) {
      throw new BadRequestException('La identificación o el email ya existe');
    }
    return true;
  }

}