"use client";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import './heart.css';
import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { useState } from "react";
import axios from "axios";
interface DataItem {
  Id: number;
  average_value_heart_rate: number;
}

export default function Heart() {
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
        <div> <h1> Heart Rate Page </h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {data.map((item) => (
              <li key={item.Id}>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                  series={[{data: [item.average_value_heart_rate, 8.5, 1.5, 5],color: '#e15759',curve: "linear"},]}
                  width={500}
                  height={300}
                />
              </li>
            ))}
          </ul>
        )}
        </div>
        <div>
          <Footer/>
        </div>
    </main>
  );
}
