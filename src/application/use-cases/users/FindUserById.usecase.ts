import { AppError } from "../../../shared/utils/AppError";
import { UserRepository } from "./../../../domain/repositories/UserRepository.repo";
export class FindUserByIdUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(uid: number) {
    if (!uid) {
      throw new Error(`Missing fields required: user-id`);
    }
    const userFound = await this.userRepository.findUser(uid);
    if (!userFound) {
      throw new AppError(`No user with id ${uid} was found!`, 404);
    }

    return userFound;
  }
}
