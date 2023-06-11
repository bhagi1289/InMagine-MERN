import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { setMaxTableCount, setChairsPerTable, logout } from '../app/actions';
import ConfigCard from "./ConfigCard";
import TableCard from "./TableCard";
import Queue from "./Queue";
import Allocation from "./Allocation";
import HTTPClient from "../HTTPClient";

const DashBoard = ({ data }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [config, setConfig] = useState({});
    const [activeTab, setActiveTab] = useState("config");
    const [selectedComponent, setSelectedComponent] = useState('config');

    const handleClick = (component) => {
        setActiveTab(component);
        setSelectedComponent(component);
    };

    async function getConfig() {
        try {
            // let response = await axios.get(`${BASE_URL}/config`, options);
            let response = await HTTPClient.get(`/config`);
            // return response.data;
            if (response.statusText === "OK") {
                const { MAX_TABLE_COUNT, CHAIRS_PER_TABLE } = response.data;
                setConfig({ MAX_TABLE_COUNT, CHAIRS_PER_TABLE });
    
                dispatch(setMaxTableCount(MAX_TABLE_COUNT));
                dispatch(setChairsPerTable(CHAIRS_PER_TABLE))
            } else {
                //navigate('/login')
                navigate('/login');

            }
        } catch (error) {
            dispatch(logout());
            navigate('/login');
        }
    }

    function renderComponent() {
        switch (selectedComponent) {
            case 'config':
                return <ConfigCard data={config} />;
            case 'queue':
                return <Queue />;
            case 'allocation':
                return <Allocation />;
            case 'tables':
                return <TableCard />;
            default:
                return [];
        }
    }

    useEffect(() => {
        getConfig();
    }, []);
    return (
        <Card>
            <Card.Header>
                <Nav variant="tabs" defaultActiveKey="#first">
                    <Nav.Item>
                        <Nav.Link href="#first" onClick={() => handleClick('config')} active={activeTab === "config"}>Configuration</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link" onClick={() => handleClick('tables')} active={activeTab === "tables"} >Tables</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link" onClick={() => handleClick('allocation')} active={activeTab === "allocation"} >Allocation</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#link" onClick={() => handleClick('queue')} active={activeTab === "queue"} >Queue</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Card.Header>
            {renderComponent()}
        </Card>
    );
}

export default DashBoard;