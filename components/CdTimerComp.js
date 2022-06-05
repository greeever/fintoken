import { useState, useEffect } from "react";
import CountDownTimer from "./CountDownTimer";



const CdTimerComp = () => {

  const THREE_DAYS_IN_MS  = new Date(Date.UTC(2022, 5, 15, 0, 0, 0));
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays =  THREE_DAYS_IN_MS - NOW_IN_MS;
  const [targetDate, setTargetDate] = useState(
    THREE_DAYS_IN_MS

  );


  // const handleChange = (event) => {
  //   event.preventDefault();
  //   if (event.target.value) {
  //     setTargetDate(new Date(event.target.value));
  //   } else {
  //     setTargetDate(new Date(dateTimeAfterThreeDays));
  //   }
  // };

  return (
    <div className="">
      <CountDownTimer targetDate={targetDate} />
    </div>
  );
};

export default CdTimerComp;