import React, { useEffect, useState } from "react";

const DayTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date): React.ReactNode => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    const [time, type] = date.toLocaleTimeString([], options).split(" ");
    return (
      <span>
        {time} <span className="text-red-1x">{type}</span>
      </span>
    );
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const [day, month, year] = formattedDate.split("/");
    return `${day}.${month}.${year}`;
  };

  const today = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
    };
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <section className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
      <div className="flex justify-between w-full py-3 text-sm bg-transparent border-black dark:border-white border-y md:px-5 dark:text-white">
        <span className="block w-[90px]">{formatTime(currentTime)}</span>
        <span className="block">{today(currentTime)}</span>
        <span className="block text-red-1x">{formatDate(currentTime)}</span>
      </div>
    </section>
  );
};

export default DayTime;
