import { useEffect, useRef, useState } from "react";

export function useDates():any{
  const [datesCompleted, setDatesCompleted] = useState(false);
  const [dateIn, setDateIn] = useState<Date>();
  const [dateOut,setDateOut] = useState<Date>();
  const dropInDateDOM = useRef<any>();
  const dropOffDateDOM = useRef<any>();

  useEffect(() => {
    dropInDateDOM.current = document.getElementById("dropInDate");
    dropOffDateDOM.current = document.getElementById("dropOffDate");
  },[])

  const setFirstDate = (value:Date) => {
    setDateIn(value);
    
    const out = new Date(value);
    out.setDate(out.getDate() + 1);
    setDateOut(out);
  }
  
  const setSecondDate = (newValue:Date) => {
    setDateOut(newValue);

    if(dateIn && dateOut)
      setDatesCompleted(true);
  }

  const reset = () => {
    setDatesCompleted(false);
    setDateIn(undefined);
    setDateOut(undefined);
    dropInDateDOM.current.value = '';
    dropOffDateDOM.current.value = '';
  }

  return {setFirstDate,setSecondDate,dateIn,dateOut,datesCompleted,reset}
}