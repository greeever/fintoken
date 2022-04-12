
import DateTimeDisplay from "./DateTimeDisplay";
import useCountDown from "../hooks/useCountDown";

const ExpiredNotice = () => {
  return (
    <div className="text-center p-2">
      <span >Expired!!!</span>
      <p className='text-lg'>Wait for next rebase.</p>
    </div>
  );
};

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
      <div
        className="flex flex-row justify-center items-center align-center text-lg font-semibold py-4"
      >
        <DateTimeDisplay value={days} type={"Days"} isDanger={days <= 1} />
        <p className="font-black text-3xl text-white">:</p>
        <DateTimeDisplay value={hours} type={"Hours"} isDanger={false} />
        <p className="font-black text-3xl text-white">:</p>
        <DateTimeDisplay value={minutes} type={"Mins"} isDanger={false} />
        <p className="font-black text-3xl text-white">:</p>
        <DateTimeDisplay value={seconds} type={"Seconds"} isDanger={false} />
      </div>
    </div>
  );
};

const CountDownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountDown(targetDate);

  if (days + hours + minutes + seconds <= 0) {
    return <ExpiredNotice />;
  } else {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
};

export default CountDownTimer;