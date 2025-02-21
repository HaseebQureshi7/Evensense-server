import { AuthRepository } from "../../../domain/repositories/AuthRepository.repo";
import { JwtService } from "../../../infrastructure/services/JWT.service";
import { PasswordService } from "../../../shared/services/PasswordService";

export class LoginUseCase {
  private authRepo: AuthRepository;

  constructor(authRepo: AuthRepository) {
    this.authRepo = authRepo;
  }

  async execute(email: string, password: string) {
    const user = await this.authRepo.findUserByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await PasswordService.comparePassword(
      password,
      user.password as string
    );
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = JwtService.generateAccessToken(user.id!);
    const refreshToken = JwtService.generateRefreshToken(user.id!);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }
}
