import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';

import { setTablesAction } from "../app/actions";
import Table from "./Table";
import HTTPClient from "../HTTPClient";


const TableCard = () => {

    const dispatch = useDispatch();

    const [tables, setTables] = useState([]);

    async function getTables() {

        // let {data} = await axios.get(`${BASE_URL}/tables`, options);
        let { data } = await HTTPClient.get('/tables')
        setTables(data);

        dispatch(setTablesAction(tables));
    }
    useEffect(() => {
        getTables();
    }, []);
    return (
        <div>
                <>
                    {
                        tables.length > 0 ? (
                            tables.map((item) => (
                                <Table item={item} key={item._id} />
                            ))
                        ) : (
                            <div>Loading........</div>
                        )
                    }
                </>
        </div>
    );
}

export default TableCard;