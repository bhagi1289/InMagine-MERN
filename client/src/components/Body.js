import React from "react";
import { useSelector } from 'react-redux';
import DashBoard from "./Dashboard";
import { useNavigate, Navigate } from 'react-router-dom';
import Login from "./Login";

// import { login, logout } from '../app/actions';

// import Login from "./Login";


const Body = () => {

    // const navigate = useNavigate();

    const loggedIn = useSelector((state) => state.login.loggedIn);
    const userData = useSelector((state) => state.login.data);
    // const dispatch = useDispatch();

    return (
        <div>
            {loggedIn ? (
                <div>
                    <DashBoard data={userData} />
                </div>
            ) :  <Navigate to="/login" replace={true} />}
        </div>
    );

}

export default Body;