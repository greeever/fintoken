const DateTimeDisplay = ({value, type, isDanger}) => {
    return (
      <div className={isDanger ? 'text-red-800 shadow-lg rounded-xl border-2 border-r-white p-2 bg-purple-500' : ' shadow-lg rounded-xl border-2 border-r-white p-2 bg-purple-500 text-white '}>
        <p>{value}</p>
        <span>{type}</span>
      </div>
    );
  };
  
  export default DateTimeDisplay;