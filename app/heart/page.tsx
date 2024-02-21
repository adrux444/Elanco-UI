"use client";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import './heart.css';
import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import axios from "axios";

const StyledPath = styled('path')(({ theme }) => ({
  fill: 'none',
  stroke: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
  strokeWidth: 1,
  pointerEvents: 'none',
}));

const StyledText = styled('text')(({ theme }) => ({
  stroke: 'none',
  fill: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
}));

interface DataItem {
  Id: number;
  Date: string
  average_value_heart_rate: number;
}

// Function to check if a date is in the given week
function isDateInWeek(date: string, week: string): boolean {
  // Assuming date format is "YYYY-MM-DD"
  const startDateOfWeek = new Date(week);
  const endDateOfWeek = new Date(week);
  endDateOfWeek.setDate(endDateOfWeek.getDate() + 6); // Assuming a week starts from Sunday and ends on Saturday

  const currentDate = new Date(date);

  return currentDate >= startDateOfWeek && currentDate <= endDateOfWeek;
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

  useEffect(() => {
    if (data.length > 0) {
      const lastWeek = getUniqueWeeks(data).pop(); 
      setSelectedWeek(lastWeek || "");
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;

  const handleWeekChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedWeek(event.target.value as string);
  };

  const filteredData = selectedWeek ? data.filter(item => isDateInWeek(item.Date, selectedWeek)) : data;

  const chartData = filteredData.map(item => ({
    name: item.Date,
    value: item.average_value_heart_rate
  }));

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
          series=
          {[
            { color: "#FF0000",
            type: "line",
            data: filteredData.map(item =>
              item.average_value_heart_rate),
              curve: "linear" }
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

// Function to get unique weeks from the data
function getUniqueWeeks(data: DataItem[]): string[] {
  // Implement your logic to extract unique weeks from the data
  // For simplicity, you can extract the week part of each date
  // This logic may vary based on your specific requirements and date format
  const weeks = data.map(item => item.Date.substring(0, 10)); // Assuming date format is "YYYY-MM-DD"
  return Array.from(new Set(weeks));
}
