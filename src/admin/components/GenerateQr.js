import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
const url = 'http://localhost:8080/api-siblab/image';

const InfoModal = (props) => {
    const [loading, setLoading] = useState(false);
    const { show,handleClose,qrValue } = props;
    

    const guardarQr = () => {
        const qrCode = document.getElementById('qr-code');
        htmlToImage.toJpeg(qrCode)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = `${qrValue.name}.jpg`;
                link.href = dataUrl;
                link.click();
            });
    };
    console.log('QR',qrValue.name);
    return (
        <>  
         <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{qrValue.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body className='text-center '>
        {<QRCode  id="qr-code" value={`Id:${qrValue.id}, Nombre:${qrValue.name}, ${url}/${qrValue.id}`} size={256} fgColor="#000000" bgColor="#ffffff" />}
                <Modal.Footer>
                    <Button variant="secondary" type='submit' onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" type='submit' onClick={guardarQr} >
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Descargar codigo"}
                    </Button>
                </Modal.Footer>
            </Modal.Body>

        </Modal>
         
    </>
       

    );
};



export default InfoModal;