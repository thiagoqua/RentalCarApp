export class Disponibility{
  public id:number|undefined;
  public userId:number|undefined;
  public carId:number;
  public dateIn:string;
  public dateOut:string;
  public paid?:boolean;

  constructor(carId:number,dateIn:string,dateout:string,paid?:boolean,userId?:number){
    this.userId = userId;
    this.carId = carId;
    this.dateIn = dateIn;
    this.paid = paid;
    this.dateOut = dateout;
  }
}