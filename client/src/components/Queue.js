import { useEffect, useState } from "react";
// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import HTTPClient from "../HTTPClient";

const Queue = ()=>{
    
    const [noOfUsers, setNoOfUsers] = useState(0);

    async function getQueue(){
        // let {data} = await axios.get(`${BASE_URL}/queue`, options);
        let { data } = await HTTPClient.get('/queue');
        // console.log(data);

        setNoOfUsers(data.noOfCustomers);

    }
    useEffect(()=>{
       getQueue();
    },[])
    return(
        <Card className="text-center">
        <Card.Header>Queue</Card.Header>
        <Card.Body>
          <Card.Title>Number of people in Queue: {noOfUsers}</Card.Title>
          <Card.Text>
            Queue will be updated based on the Allocation of Tables.
          </Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
        <Card.Footer className="text-muted">Restaurant</Card.Footer>
      </Card>
    )
}

export default Queue;