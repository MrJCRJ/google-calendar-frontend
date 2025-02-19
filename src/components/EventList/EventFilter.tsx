// EventFilter.tsx
import React, { ChangeEvent } from "react";
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
  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  return (
    <Row className="mb-4">
      <Col md={5}>
        <Form.Control
          type="date"
          value={startDate}
          onChange={handleStartChange}
        />
      </Col>
      <Col md={5}>
        <Form.Control type="date" value={endDate} onChange={handleEndChange} />
      </Col>
      <Col md="auto">
        <Button variant="primary" onClick={handleFetchWithDates}>
          <FaSearch /> Buscar
        </Button>
      </Col>
    </Row>
  );
};

export default React.memo(EventFilter);
