
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import HTTPClient from '../HTTPClient';


// import InputGroup from 'react-bootstrap/InputGroup';

const Allocation = () => {

    const [noOfUsers, setNoOfUsers] = useState(0);

    function handleInputChange(event) {
        setNoOfUsers(event.target.value);
    }
    async function handleData() {
        // let response = await axios.get(`${BASE_URL}/tables/allocate?numberOfCustomers=${noOfUsers}`, options);
        let response = await HTTPClient.get(`/tables/allocate?numberOfCustomers=${noOfUsers}`)
        // let {allocatedTables, queuedMembers } = data;

        if (response.statusText === "OK") {
                response && (
                    <Alert variant="success">
                        Tables are updated. Please check tables section.
                    </Alert>
                )
        }
    }

    // useEffect(()=>{

    // },[])

    return (
        <>
            <h1>Allocation</h1>
            <Container>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label>No. of Users</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="No. Of Users"
                            value={noOfUsers}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                </Form>

                <div style={{ marginTop: '1rem' }}>
                    <Button variant="primary" onClick={handleData}>Submit</Button>
                </div>


            </Container>
            <hr />
        </>


    )
}

export default Allocation;