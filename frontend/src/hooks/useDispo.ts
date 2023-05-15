import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { DisponibilityService } from "../services/disponibilityService";
import { User } from "../models/User";

interface Props {
  requester?:User;
}

export function useDispo({requester}:Props){
  const [dispos,setDispos] = useState<Disponibility[]>();
  const [error,setError] = useState<string>();
  const dispoService:DisponibilityService = new DisponibilityService();
  
  const getDispos = () => {
    dispoService.getAll(requester!.id!,requester!.token!).then((response:Response) => {
      if(response.status == 401)
        setError("You are not an ADMIN user to access this resource");
      else
        response.json().then((data:Disponibility[]) => setDispos(data));
    })
  }

  const deleteDispo = (id:number) => {
    dispoService.deleteById(id,requester!.token!);
  }

  const payDispo = (id:number) => {
    dispoService.setPaid(requester!,id);
  }

  useEffect(() => {
    if(requester)
      getDispos();
  },[requester]);

  return {dispos,fetchDispos:getDispos,deleteDispo,payDispo};
}