
import React,{ useEffect, useState } from 'react';
import {
  Button, Card, CardBody, CardTitle, CardText,
  Row, Col, Input, Badge, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import axios from '../api/axiosClient';
import EventForm from './EventForm';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState('upcoming');
  const [editing, setEditing] = useState(null); // null = closed, {} = new, event = edit
  const [modalOpen, setModalOpen] = useState(false);

  const fetchEvents = async (f = filter) => {
    const params = f === 'all' ? {} : { filter: f };
    const res = await axios.get('/events', { params });
    setEvents(res.data);
  };

  useEffect(() => { fetchEvents(filter); }, [filter]);

  const createEvent = async (data) => {
    await axios.post('/events', data);
    closeModal();
    fetchEvents();
  };

  const updateEvent = async (id, data) => {
    await axios.put(`/events/${id}`, data);
    closeModal();
    fetchEvents();
  };

  const deleteEvent = async (id) => {
    await axios.delete(`/events/${id}`);
    fetchEvents();
  };

  const enableShare = async (id) => {
    const res = await axios.post(`/events/${id}/share`);
    const slug = res.data.shareSlug;
    alert(`Public URL: ${window.location.origin}/shared/${slug}`);
    fetchEvents();
  };

  const disableShare = async (id) => {
    await axios.delete(`/events/${id}/share`);
    fetchEvents();
  };

  const openModal = (event = {}) => {
    setEditing(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditing(null);
    setModalOpen(false);
  };

  return (
    <div className="p-3">
      <Row className="mb-3">
        <Col md="6">
          <h5>Your Events</h5>
        </Col>
        <Col md="6" className="text-end">
          <Input
            type="select"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ maxWidth: 200, display: 'inline-block' }}
          >
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
            <option value="all">All</option>
          </Input>
          <Button color="success" className="ms-2" onClick={() => openModal({})}>
            New Event
          </Button>
        </Col>
      </Row>

      {/* Modal for Add/Edit */}
      <Modal isOpen={modalOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>
          {editing && editing._id ? 'Edit Event' : 'Create Event'}
        </ModalHeader>
        <ModalBody>
          <EventForm
            initial={editing}
            onSubmit={(payload) =>
              editing && editing._id
                ? updateEvent(editing._id, payload)
                : createEvent(payload)
            }
          />
        </ModalBody>
      </Modal>

      <Row>
        {events.map(ev => {
          const isPast = new Date(ev.datetime) < new Date();
          return (
            <Col md="6" lg="4" key={ev._id} className="mb-3">
              <Card>
                <CardBody>
                  <CardTitle tag="h6">
                    {ev.title}{' '}
                    <Badge color={isPast ? 'secondary' : 'primary'}>
                      {isPast ? 'Past' : 'Upcoming'}
                    </Badge>
                  </CardTitle>
                  <CardText>
                    <strong>Date:</strong> {new Date(ev.datetime).toLocaleString()}<br />
                    <strong>Location:</strong> {ev.location}<br />
                    {ev.description && (<><strong>Description:</strong> {ev.description}</>)}
                  </CardText>
                  <div className="d-flex gap-2 flex-wrap">
                    <Button color="info" onClick={() => openModal(ev)}>Edit</Button>
                    <Button color="danger" onClick={() => deleteEvent(ev._id)}>Delete</Button>
                    {!ev.shareSlug ? (
                      <Button color="primary" onClick={() => enableShare(ev._id)}>Enable Share</Button>
                    ) : (
                      <>
                        <Button color="secondary" onClick={() => disableShare(ev._id)}>Disable Share</Button>
                        <Button color="dark" onClick={() => alert(`Public URL: ${window.location.origin}/shared/${ev.shareSlug}`)}>Copy Link</Button>
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
