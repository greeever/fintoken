import { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';


export default function CountDown({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn('onExpire called')
  });

  useEffect(() => {
    restart(expiryTimestamp);
    start();
  }, [expiryTimestamp]);

  return (
    <>
        <p >
          {days.toString().padStart(2, '0')}
        </p>
        <p>
          DAYS
        </p>
     
        <p >
          :
        </p>
    
        <p >
          {hours.toString().padStart(2, '0')}
        </p>
        <p>
          HOURS
        </p>

        <p >
          :
        </p>
      
        <p >
          {minutes.toString().padStart(2, '0')}
        </p>
        <p>
          MINUTES
        </p>
        <p >
          :
        </p>
        <p>
          {seconds.toString().padStart(2, '0')}
        </p>
        <p>
          SECONDS
        </p>

    </>
  );
}