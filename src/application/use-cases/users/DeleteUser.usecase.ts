import { UserRepository } from "./../../../domain/repositories/UserRepository.repo";
export class DeleteUserUsecase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  execute(uid: number) {
    if (!uid) {
      throw new Error(`Missing fields required: user-id`);
    }
    return this.userRepository.deleteUser(uid);
  }
}
