import React from "react";
import './App.css';

import { createBrowserRouter, Outlet } from "react-router-dom";
import Body from "./components/Body";
import Error from "./components/Error";
import NavigationBar from "./components/NavigationBar";
import Login from "./components/Login";

const AppLayout = ()=>{
    return(
        <div className="app">
        <NavigationBar />

        <Outlet />
        </div>
    );
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        errorElement: <Error />,
        children:[
          {
            path:'/login',
            element: <Login />
          },{
            path:'/',
            element:<Body />
          }
        ]
    }
]);

export default appRouter;