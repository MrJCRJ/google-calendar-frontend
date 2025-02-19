import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

interface EventFilterProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  handleFetchWithDates: () => void;
}

const EventFilter: React.FC<EventFilterProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleFetchWithDates,
}) => {
  return (
    <Row className="mb-4">
      <Col md={5}>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </Col>
      <Col md={5}>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </Col>
      <Col md="auto">
        <Button variant="primary" onClick={handleFetchWithDates}>
          <FaSearch /> Buscar
        </Button>
      </Col>
    </Row>
  );
};

export default EventFilter;
