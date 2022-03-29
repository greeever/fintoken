import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';

export default function CountDownShort({ expiryTimestamp }) {
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
  }, [expiryTimestamp]);

  return (
    <>
        <p >
          {minutes.toString().padStart(2, '0')}
        </p>
        <p>
          MINUTES
        </p>
        <p>
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