import React, { useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import HTTPClient from '../HTTPClient';

const Table = ({ item }) => {

  const [isEditMode, setIsEditMode] = useState(false);
  const [editedStatus, setEditedStatus] = useState(item.status);

  const handleEdit = () => {
    // Handle edit functionality for the item with the given id
    // console.log(`Edit item with id ${JSON.stringify(item)}`);
    setIsEditMode(true);
  };

  const handleSave = (item) => {
    // Perform save/update logic with the edited status
    // You can make an API call or update the item in Redux state
    console.log(editedStatus);

    // After saving, exit edit mode
    setIsEditMode(false);
    // console.log(item);
  item.status = editedStatus;
  // axios.put(`${BASE_URL}/tables/${item._id}`,item,options);
  HTTPClient.put('tables/${item._id}', item);
  
  };

  const handleCancel = () => {
    // Reset the edited status and exit edit mode
    setEditedStatus(item.status);
    setIsEditMode(false);
  };
  const handleStatusChange = (event) => {
    setEditedStatus(event.target.value);
  };

  const handleDelete = (id) => {
    // Handle delete functionality for the item with the given id
    console.log(`Delete item with id ${id}`);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        {isEditMode ? (
          <select
            value={editedStatus}
            onChange={handleStatusChange}
            className="form-select"
          >
            <option value="occupied">Occupied</option>
            <option value="unoccupied">Unoccupied</option>
          </select>
        ) : (
          <Card.Subtitle className="mb-2 text-muted">Status: {item.status}</Card.Subtitle>
        )}
        {/* <Card.Subtitle className="mb-2 text-muted">Status: {item.status}</Card.Subtitle> */}
        <ListGroup variant="flush">
          <ListGroup.Item>
            <div className="d-flex justify-content-end">
              {isEditMode ? (
                <>
                  <Button variant="success" onClick={()=>{handleSave(item)}}>Save</Button>
                  <div style={{ marginLeft: '0.5cm' }}></div>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button variant="primary" onClick={handleEdit}>Edit</Button>
                  <div style={{ marginLeft: '0.5cm' }}></div>
                  <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </>
              )}
            </div>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default Table;