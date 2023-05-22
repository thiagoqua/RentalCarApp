import { useEffect, useState } from "react";
import { Disponibility } from "../models/Disponibility";
import { DisponibilityService } from "../services/disponibilityService";
import { User } from "../models/User";
import { removeSomething, savedDispo } from "../helpers/localStorageAccesses";

interface Props {
  requester?:User;
}

export function useDispo({requester}:Props){
  const [dispo,setDispo] = useState<Disponibility>();
  const service: DisponibilityService = new DisponibilityService();

  useEffect(() => {
    if(requester){
      const dispo: Disponibility | null = savedDispo();
      if (dispo) {
        //if null becouse trying to access via url
        setDispo(dispo);
        if (requester) {
          dispo.userId = requester.id;
          removeSomething("dispo");
        }
      }
    }
  },[requester])

  const makeReserve = () => {
    return service.save(dispo!, requester!.token!);
  }

  return {dispoInCuestion:dispo,makeReserve}
}