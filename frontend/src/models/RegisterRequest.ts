export class RegisterRequest{
  public firstname:string;
  public lastname:string;
  public email:string;
  public nationality:string;
  public identifier:number;
  public password:string;
  public borndate:string;

  constructor(
    firstname:string,
    lastname:string,
    email:string,
    nationality:string,
    borndate:string,
    identifier:number,
    password:string
  ){
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.nationality = nationality;
    this.identifier = identifier;
    this.password = password;
    this.borndate = borndate;
  }
}