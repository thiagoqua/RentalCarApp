export class User{
  public id:number|undefined;
  public token:string|undefined;
  public firstname:string|undefined;
  public lastname:string|undefined;
  public email:string|undefined;
  public nationality:string|undefined;
  public identifier:number|undefined;
  public borndate:string|undefined;

  constructor(
    firstname?:string,
    lastname?:string,
    email?:string,
    nationality?:string,
    borndate?:string,
    identifier?:number,
    id?:number,
    token?:string
  ){
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.nationality = nationality;
    this.identifier = identifier;
    this.borndate = borndate;
    this.id = id;
    this.token = token;
  }
}