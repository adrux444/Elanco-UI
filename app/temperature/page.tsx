"use client";

import axios from "axios";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import './temperature.css';
import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { useState } from "react";

interface DataItem {
  Id: number;
  average_temperature: number;
}
export default function Temperature() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartData, setChartData] = useState();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataItem[]>('http://localhost:4000/average');
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

  if (loading) return <p>Loading...</p>

  return (
    <main>
      <div>
        <NavBar/>
      </div>
      <div><h1> Temperature Page </h1>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            {data.map((item) => (
            <li key={item.Id}>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 4, 5, 6 , 7] }]}
                series={[{ data: [item.average_temperature, item.average_temperature, item.average_temperature, item.average_temperature, item.average_temperature, item.average_temperature], color: '#e15759', curve: "linear" },]}
                width={500}
                height={300} />
            </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}
