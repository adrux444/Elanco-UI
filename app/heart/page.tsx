"use client";
import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import axios from "axios";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import './heart.css';

interface DataItem {
  Id: number;
  Date: string;
  average_value_heart_rate: number;
}

export default function Heart() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/averageEachDayCanineOne');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleWeekChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedWeek(event.target.value as string);
  };

  const filteredData = selectedWeek ? data.filter(item => isDateInWeek(item.Date, selectedWeek)) : data;
  
  return (
    <main>
      <div>
        <NavBar/>
      </div>
      <div>
        <h1> Heart Rate Page </h1>
        <select value={selectedWeek} onChange={handleWeekChange}>
          <option value="">All data</option>
          {getUniqueWeeks(data).map(week => (
            <option key={week} value={week}>{week}</option>
          ))}
        </select>

        <LineChart
          xAxis={[{ scaleType: 'band', data: filteredData.map(item => item.Date) }]}
          series={[
            {
              color: "#FF0000",
              type: "line",
              data: filteredData.map(item => item.average_value_heart_rate),
              curve: "linear"
            }
          ]}
          width={1950}
          height={600}
        />
      </div>
      <div>
        <Footer/>
      </div>
    </main>
  );
}

function isDateInWeek(date: string, week: string): boolean {
  const startDateOfWeek = parseDate(week);
  const endDateOfWeek = new Date(startDateOfWeek);
  endDateOfWeek.setDate(endDateOfWeek.getDate() + 6);

  const currentDate = parseDate(date);

  return currentDate >= startDateOfWeek && currentDate <= endDateOfWeek;
}

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

const getUniqueWeeks = (data: DataItem[]): string[] => {
  const weeks = data.map(item => item.Date.substring(0, 10));
  return Array.from(new Set(weeks));
};
