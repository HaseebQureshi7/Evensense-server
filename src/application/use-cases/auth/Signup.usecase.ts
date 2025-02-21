import { AuthRepository } from "../../../domain/repositories/AuthRepository.repo";
import { User } from "../../../domain/entities/User.entity";

export class SignupUseCase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(name: string, email: string, password: string): Promise<User> {
    const missingFields = ["name", "email", "password"].filter(
      (field) => !eval(field)
    );
    
    if (missingFields.length) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    const existingUser = await this.authRepo.findUserByEmail(email);
    if (existingUser) throw new Error("User already exists!");

    const newUser = User.create({name, email, password});
    return this.authRepo.createUser(newUser);
  }
}
