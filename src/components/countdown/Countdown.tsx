// components/countdown/Countdown.tsx
"use client";

import React, { useState, useEffect } from "react";
import "./styles.css";

interface CountdownProps {
  startDate: Date;
  endDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const addHours = (date: Date, hours: number): Date => {
  const newDate = new Date(date);
  newDate.setHours(newDate.getHours() + hours);
  return newDate;
};

const getTimeLeft = (startDate: Date, endDate: Date): TimeLeft => {
  const totalTimeLeft = endDate.getTime() - new Date().getTime();

  // Ensure the countdown stops at zero
  if (totalTimeLeft <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((totalTimeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const Countdown: React.FC<CountdownProps> = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const adjustedEndDate = addHours(endDate, 24);

  useEffect(() => {
    setIsMounted(true);

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(startDate, adjustedEndDate));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [startDate, endDate]);

  if (!isMounted || !timeLeft) return null;

  return (
    <div className="countdown">
      <h2>Countdown</h2>
      <div className="content">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div className="box" key={label}>
            <div className="value">
              <span>{value}</span>
            </div>
            <span className="label"> {label} </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;

// "use client";

// import React, { useState, useEffect } from "react";
// import "./styles.css";

// const COUNTDOWN_TARGET = new Date("2024-11-31T23:59:59");

// interface TimeLeft {
//   days: number;
//   hours: number;
//   minutes: number;
//   seconds: number;
// }

// const getTimeLeft = (): TimeLeft => {
//   const totalTimeLeft = COUNTDOWN_TARGET.getTime() - new Date().getTime();
//   const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
//   const seconds = Math.floor((totalTimeLeft / 1000) % 60);
//   return { days, hours, minutes, seconds };
// };

// const Countdown: React.FC = () => {
//   const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//     const timer = setInterval(() => {
//       setTimeLeft(getTimeLeft());
//     }, 1000);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   if (!isMounted || !timeLeft) return null;

//   return (
//     <div className="countdown">
//       <h2>Countdown</h2>
//       <div className="content">
//         {Object.entries(timeLeft).map(([label, value]) => (
//           <div className="box" key={label}>
//             <div className="value">
//               <span>{value}</span>
//             </div>
//             <span className="label"> {label} </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Countdown;
