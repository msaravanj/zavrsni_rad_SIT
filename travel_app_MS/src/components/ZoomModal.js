import React from "react";
import { Modal } from "react-bootstrap";

const ZoomModal = (props) => {
  return (
    <Modal
      size="sm"
      show={props.showZoomModal}
      onHide={() => props.onShowZoomModal(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>Click on map to zoom in location.</Modal.Body>
    </Modal>
  );
};

export default ZoomModal;
