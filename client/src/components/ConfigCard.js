import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

import Button from 'react-bootstrap/Button';

const ConfigCard = ({data})=>{
    return(
        <Card.Body>
        <Card.Title>Restaurant Configuration</Card.Title>
        <Card.Text>
            Maximum Tables: {data.MAX_TABLE_COUNT || 0}
        </Card.Text>
            <Card.Text>
            Maximum Chairs per Table : {data.CHAIRS_PER_TABLE || 0}
        </Card.Text>
        <Button variant="primary">Update</Button>
    </Card.Body>
    )
}

export default ConfigCard;