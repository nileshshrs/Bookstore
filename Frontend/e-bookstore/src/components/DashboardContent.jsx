import React, { useState, useEffect } from 'react';
import axios from 'axios';
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import "../css/chart.css"


//Used react recharts library , npm install recharts= before running 

function DashboardContent() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [totalCarts, setTotalCarts] = useState(0);
  useEffect(() => {
    // Fetch user data
    axios.get('http://localhost:8080/api/v2/users/all')
    .then(response => {
      setTotalUsers(response.data.length);
    })
    .catch(error => {
      console.error('Error fetching user count:', error);
    });

    // Fetch order data
   
   axios.get('http://localhost:8080/api/v2/orders/all')
   .then(response => {
     setTotalOrders(response.data.length);
   })
   .catch(error => {
     console.error('Error fetching order count:', error);
   });

   
    // Fetch book count
    axios.get('http://localhost:8080/api/v2/books/getAll')
      .then(response => {
        setTotalBooks(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching book count:', error);
      });
  
    // Fetch cart count
    axios.get('http://localhost:8080/api/v2/carts/get-all')
      .then(response => {
        setTotalCarts(response.data.length);
      })
      .catch(error => {
        console.error('Error fetching cart count:', error);
      });

  }, []);

  


  const chartData = [
    { name: 'Users', count: totalUsers },
    { name: 'Orders', count: totalOrders },
    { name: 'Books', count: totalBooks },
    { name: 'Carts', count: totalCarts },
  ];
     

  return (
    <main className='main-container ml-1'>
        <div className='flex items-center justify-between '>
    <h1 className='text-[28px] leading-[34px] font-normal text-[#5a5c69] cursor-pointer'>Dashboard</h1>

    
</div>

<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[30px] mt-[25px] pb-[15px] ' style={{ paddingLeft: "70px", '@media (max-width: 768px)': { paddingLeft: '0px' } }}>
    <div className='h-[80px] rounded-[8px] bg-[#EDEBE4] shadow-lg border-l-[4px] border-[#4E73DF]  flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
        <div>
            <h2 className='text-[#B589DF] text-[11px] leading-[17px] font-bold'>Total Users</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{totalUsers}</h1>
        </div>
    </div>

    <div className='h-[80px] rounded-[8px] bg-[#EDEBE4] shadow-lg border-l-[4px] border-[#1CC88A] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
        <div>
            <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>Total Orders</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{totalOrders}</h1>
        </div>
    </div>

    <div className='h-[80px] rounded-[8px] bg-[#EDEBE4] shadow-lg border-l-[4px] border-[#36B9CC] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
        <div>
            <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>Total Book </h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{totalBooks}</h1>
        </div>
    </div>

    <div className='h-[80px] rounded-[8px] bg-[#EDEBE4] shadow-lg border-l-[4px] border-[#F6C23E] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out'>
        <div>
            <h2 className='text-[#1cc88a] text-[11px] leading-[17px] font-bold'>Total Carts</h2>
            <h1 className='text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]'>{totalCarts}</h1>
        </div>
    </div>
</div>

<div className='charts'>
       {/* barchart */}
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='count' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>

{/* line chart section */}
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type='monotone' dataKey='count' stroke='#8884d8' activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  )
}

export default DashboardContent