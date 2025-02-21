export class User {
  public id?: number;
  public name: string;
  public email: string;
  public password?: string;
  public created_at?: Date;

  private constructor(name: string, email: string, password?: string, id?: number, created_at?: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.created_at = created_at;
  }

  static create({ id, name, email, password, created_at }: Partial<User> & Pick<User, "name" | "email">): User {
    return new User(name, email, password, id, created_at);
  }

  getSafeUser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      created_at: this.created_at,
    };
  }
}
