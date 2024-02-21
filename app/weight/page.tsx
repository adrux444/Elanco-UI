"use client";

import NavBar from "../navbar/page";
import Footer from "../footer/page";
import './weight.css';
import * as React from 'react';
import { LineChart } from '@mui/x-charts';
import { useState, useEffect } from "react";
import axios from "axios";


interface DataItem {
  Id: number;
  average_weight: number;
  Date: number;
}


// ...

export default function Weight() {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <main>
      <div>
        <NavBar />
      </div>
      <div>
        <h1>Weight Page</h1>
        {error ? (
          <p>{error}</p>
        ) : (
          <LineChart
           // xAxis={[{ data: data.map((item) => item.Date) }]}
            xAxis={[{ scaleType: 'band', data: data.map(item => item.Date) }]}
            series={[
              {
                data: data.map((item) => item.average_weight),
                color: '#e15759',
                curve: 'linear',
              },
            ]}
            width={500}
            height={300}
          />
        )}
      </div>
      <div>
        <Footer />
      </div>
    </main>
  );
}






