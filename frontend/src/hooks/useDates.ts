import { useState } from "react";

export function useDates():any{
  const [datesCompleted, setDatesCompleted] = useState(false);
  const [dateIn, setDateIn] = useState<Date>();
  const [dateOut,setDateOut] = useState<Date>();

  const setFirstDate = () => {
    const dropInDate: any = document.getElementById("dropInDate");
    setDateIn(dropInDate.valueAsDate);

    const out = new Date(dropInDate.valueAsDate);
    out.setDate(out.getDate() + 1);
    setDateOut(out);
  }

  const setSecondDate = () => {
    const dropOffDate: any = document.getElementById("dropOffDate");
    setDateOut(dropOffDate.valueAsDate);
    if(dateIn && dateOut){
      setDatesCompleted(true);
    }
  }

  const reset = () => {
    setDatesCompleted(false);
    setDateIn(undefined);
    setDateOut(undefined);
  }

  return {setFirstDate,setSecondDate,dateIn,dateOut,datesCompleted,reset}
}