import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

export default function EventForm({ initial, onSubmit }) {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (initial) {
      setTitle(initial.title || '');
      setDatetime(initial.datetime ? new Date(initial.datetime).toISOString().slice(0,16) : '');
      setLocation(initial.location || '');
      setDescription(initial.description || '');
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      datetime: new Date(datetime).toISOString(),
      location,
      description
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title</Label>
        <Input value={title} placeholder='Please enter title' onChange={e => setTitle(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label>Date & Time</Label>
        <Input type="datetime-local" placeholder='Please enter date and time' value={datetime} onChange={e => setDatetime(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label>Location</Label>
        <Input value={location} placeholder='Please enter location' onChange={e => setLocation(e.target.value)} required />
      </FormGroup>
      <FormGroup>
        <Label>Description (optional)</Label>
        <Input type="textarea" placeholder='Please enter description' value={description} onChange={e => setDescription(e.target.value)} />
      </FormGroup>
      <Button color="primary" type="submit">Save</Button>
    </Form>
  );
}
