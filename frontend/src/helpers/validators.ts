export function borndateValidator(dateStr:string):boolean{
  const date:any = new Date(dateStr);
  const age:number = (new Date().getTime() - date) / (1000 * 60 * 60 * 24 * 365);
  return age > 18;
}

export function passwordsMatchValidator(password:string,rePassword:string):boolean{
  return password === rePassword;
}