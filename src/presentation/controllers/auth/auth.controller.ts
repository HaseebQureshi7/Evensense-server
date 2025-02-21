import { Request, Response } from "express";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { LoginUseCase } from "../../../application/use-cases/auth/Login.usecase";
import { AuthRepositoryImpl } from "../../../infrastructure/repositories/AuthRepository.impl";
import { SignupUseCase } from "../../../application/use-cases/auth/Signup.usecase";
import { RefreshTokenUseCase } from "../../../application/use-cases/auth/RefreshToken.usecase";

const authRepo = new AuthRepositoryImpl();

export class AuthController {
  userLogin = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const authRepo = new AuthRepositoryImpl();
    const loginUseCase = new LoginUseCase(authRepo);

    const { user, accessToken, refreshToken } = await loginUseCase.execute(
      email,
      password
    );

    // Store refresh token in an HTTP-only cookie
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

    // Send user details and access token in the response
    res.status(200).json({ user, accessToken });
  });

  userSignup = catchAsync(async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const signupUseCase = new SignupUseCase(authRepo);
    const user = await signupUseCase.execute(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  });

  // Re-create to take refresh from a cookie
  refreshToken = async (req: Request, res: Response) => {
    const refreshTokenUseCase = new RefreshTokenUseCase();
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await refreshTokenUseCase.execute(refreshToken);
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  };

  userLogout = catchAsync(async (_req: Request, res: Response) => {
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  });
}
