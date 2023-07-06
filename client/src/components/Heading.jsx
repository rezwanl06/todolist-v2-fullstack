import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Heading = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    fetchDateTime(); // Fetch initial time and date
    const interval = setInterval(fetchDateTime, 1000); // Fetch time and date every second

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);

  const fetchDateTime = async () => {
    try {
      const response = await axios.get('http://localhost:5000/date-time');
      const { date, time } = response.data;
      setDate(`${date}`);
      setTime(`${time}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <h1 id='heading'>{date}</h1>
        <h1 id='heading'>{time}</h1>
    </div>
  );
};

export default Heading;
