import React from "react";
import { Link, Outlet } from "react-router-dom";
import TodoList from "../components/TodoList"


const Dashboard = () => {
  return <>
    <TodoList/>
  </>
};

export default Dashboard;
