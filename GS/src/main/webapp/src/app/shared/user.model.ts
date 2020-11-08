export class User{
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  isAdmin: boolean;

  constructor(id: number, username: string, password: string, email: string, name: string, dateOfBirth: Date, isAdmin: boolean) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.email = email;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
    this.isAdmin = isAdmin;
  }

}
