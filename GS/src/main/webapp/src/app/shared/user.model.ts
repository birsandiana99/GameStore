export class User{
  id: number;
  username: string;
  name: string;
  emailAddress: string;
  password: string;
  dateOfBirth: Date;

  constructor(id: number, username: string, name: string, emailAddress: string, password: string, dateOfBirth: Date) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.emailAddress = emailAddress;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
  }

}
