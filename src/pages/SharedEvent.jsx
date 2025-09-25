import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosClient';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

export default function SharedEvent() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [notFound, setNotFound] = useState(false);

useEffect(() => {
  axios.get(`/events/shared/${slug}`)
    .then(res => setEvent(res.data))
    .catch(err => {
      if (err.response?.status === 410) {
        setNotFound(true);
      } else {
        setNotFound(true);
      }
    });
}, [slug]);


  if (notFound) return <div className="container p-4">Shared event not found</div>;
  if (!event) return <div className="container p-4">Loading...</div>;
if (notFound) return <div className="container p-4">This shared event link has expired.</div>;

  return (
    <div className="container p-4">
      <Card>
        <CardBody>
          <CardTitle tag="h5">{event.title}</CardTitle>
          <CardText>
            <strong>Date:</strong> {new Date(event.datetime).toLocaleString()}<br />
            <strong>Location:</strong> {event.location}<br />
            {event.description && (<><strong>Description:</strong> {event.description}</>)}
          </CardText>
        </CardBody>
      </Card>
      
    </div>
  );
}
