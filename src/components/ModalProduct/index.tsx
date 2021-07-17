/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React, { useState } from 'react';
import { Modal, Button} from 'react-bootstrap';

 type ProductsDescriptionProps= {
   name?: string | undefined;
   detailsProducts?: string;
 };

export default function ModalProduct({name, detailsProducts}: ProductsDescriptionProps) {

  const [ show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow  = () => setShow(true);

  return (
    <>
    <Button variant="secondary" onClick={handleShow}>
        Detalhes do Produto
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{detailsProducts}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
