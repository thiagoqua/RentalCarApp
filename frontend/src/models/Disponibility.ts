export class Disponibility{
  public id:number|undefined;
  public carId:number;
  public dateIn:string;
  public dateOut:string;

  constructor(carId:number,dateIn:string,dateout:string){
    this.carId = carId;
    this.dateIn = dateIn;
    this.dateOut = dateout;
  }
}