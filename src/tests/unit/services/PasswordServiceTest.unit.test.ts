import { PasswordService } from "../../../shared/services/PasswordService";

describe("Password Service Tests", () => {
  describe("Password Hashing Tests", () => {
    it("should hash a plaintext password into a hashed string", async () => {
      const plainTextPassword = "Plain Text Password";

      const res = await PasswordService.hashPassword(plainTextPassword);

      expect(res).not.toBe(plainTextPassword); // Should not return the same password
      expect(res.length).toBe(60); // Hash has a length of 60
      expect(res).toMatch(/[\$\.\/]/); // Hash ususally contains one of these
    });
  });

  describe("Password Comparisn Tests", () => {
    it("should compare 2 equal passwords", async () => {
      const plainTextPassword = "Plain Text Password";
      const hashedPassword =
        "$2b$10$er.BJH7EyxNUlx/QWmlzf.JddKszjQd4TcBvn3SCeW0kYijmy5xPS";

      const res = await PasswordService.comparePassword(
        plainTextPassword,
        hashedPassword
      );

      expect(res).toBe(true);
    });

    it("should not compare 2 unequal passwords", async () => {
      const plainTextPassword = "Plain Text Password";
      const selfHashedPassword =
        "xx-wrong-$2b$10$er.BJH7EyxNUlxas/QWmlzf.JddKszjQd4TcBvn3SCeW0kYijmy5xPS2123";

      const res = await PasswordService.comparePassword(
        plainTextPassword,
        selfHashedPassword
      );

      expect(res).toBe(false);
    });
  });
});
