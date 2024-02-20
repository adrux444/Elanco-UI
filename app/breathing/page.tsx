"use client";
import NavBar from "../navbar/page";
import Footer from "../footer/page";
import './breathing.css';
import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import { useState } from "react";
import axios from "axios";
interface DataItem {
  Id: number;
  average_weight: number;
}

export default function Breathing() {

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
          <div> <h1> Breathing Rate Page </h1>
            {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {data.map((item) => (
                <li key={item.Id}>
                  <BarChart
                    xAxis={[{ scaleType: 'band', data: ['Canine 1', 'Canine 2', 'Canine 3'] }]}
                    series={[{ data: [item.average_weight, 3, 5]}]}
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
