"use client";
import axios from 'axios';
import React, { useState, useEffect } from "react";
import Footer from "../footer/page";
import NavBar from "../navbar/page";
import './sleep.css';
import { PieChart } from '@mui/x-charts';
interface DataItem {
  Id: number; // Adjust the type based on your actual data structure
  average_value_heart_rate: number;
  // Add other properties as needed
}

  
  export default function Login() {
    const [data, setData] = useState<DataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get<DataItem[]>('http://localhost:4000/average_canineone');
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
          <div> <h1> Sleep Page </h1>
          
            

            
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <ul>
              {data.map((item) => (
                <p key={item.Id}>
                  <PieChart
                    series={[{
                      data: [
                        { id: 0, value: 10, label: 'Sleeping' },
                        { id: 1, value: 15, label: 'Normal' },
                        { id: 2, value: 20, label: 'Eating' },
                        { id: 2, value: 20, label: 'Walking' },
                      ],
                    },]}
                    width={400}
                    height={200}
                  />
                </p>
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
