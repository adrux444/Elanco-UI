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
  const [selectedDates, setSelectedDates] = useState<{ [key: number]: string | null }>({});

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

  const years = [2021, 2022, 2023];

  const handleDateChange = (year: number, date: string | null) => {
    setSelectedDates(prevState => ({
      ...prevState,
      [year]: date
    }));
  };

  return (
    <main>
      <div>
        <NavBar />
      </div>
      <div>
        <h1>Heart Rate Page</h1>
        {years.map((year, index) => (
          <div key={index}>
            <h2>{year}</h2>
            <div>
              <label>Select Day and Month: </label>
              <input
                type="text"
                placeholder="DD-MM"
                value={selectedDates[year] || ''}
                onChange={(e) => handleDateChange(year, e.target.value)}
              />
            </div>
            <LineChart
              xAxis={[{ scaleType: 'band', data: getFilteredData(year).map(item => item.Date) }]}
              series={[
                {
                  color: "#FF0000",
                  type: "line",
                  data: getFilteredData(year).map(item => item.average_value_heart_rate),
                  curve: "linear"
                }
              ]}
              width={1950}
              height={600}
            />
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );

  function getFilteredData(year: number): DataItem[] {
    if (!selectedDates[year]) {
      return data.filter(item => new Date(item.Date).getFullYear() === year);
    } else if (selectedDates[year]) {
      const parts = selectedDates[year]!.split('-');
      if (parts.length === 2) {
        const [day, month] = parts.map(Number);
        const startDate = new Date(year, month - 1, day);
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        return data.filter(item => {
          const date = new Date(item.Date);
          return date >= startDate && date <= endDate;
        });
      }
    }
    return [];
  }
}
