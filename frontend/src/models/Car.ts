export class Car{
    public id:number;
    public category:string;
    public brand:string;
    public model:string;
    public imageURL:string;
    public year:number;
    public pricePerDay:number;
    public doors:number;                //4 or 2
    public transmission:string;        //automatic or manual
    public fuelType:string;            //gasoline, diesel, hybrid or electric
    public AC:boolean;
    public urbanConsumption:number;     //kilometers per litre
    public routeConsumption:number;     //kilometers per litre

    constructor(
        id:number,
        category:string,
        brand:string,
        model:string,
        imageURL:string,
        year:number,
        pricePerDay:number,
        doors:number,
        transmission:string,
        fuelType:string,
        AC:boolean,
        urbanConsumption:number,
        routeConsumption:number
    ){
        this.id = id;
        this.category = category;
        this.brand = brand;
        this.model = model;
        this.imageURL = imageURL;
        this.year = year;
        this.pricePerDay = pricePerDay;
        this.doors = doors;
        this.transmission = transmission;
        this.fuelType = fuelType;
        this.AC = AC;
        this.urbanConsumption = urbanConsumption;
        this.routeConsumption = routeConsumption;
    }
}