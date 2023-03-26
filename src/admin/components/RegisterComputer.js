import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Loading from '../../main/components/Loading';
import { addMachine } from '../services/InventoryServices';
import apiUrl from '../../main/utils/AppUrl';
function Example(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setImageUrl(null)
  }
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [hard_disk, setHardDisk] = useState("");
  const [cpu, setCpu] = useState("");
  const [specific_features, setFeatures] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [options, setOptions] = useState([]);
  const [aula, setAula] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const choseAula = async () => {
      const choose = await apiUrl.get('/laboratory/');
      setOptions(choose.data.data);
    }
    choseAula();

  }, []);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImage(selectedFile);
    const imageURL = URL.createObjectURL(selectedFile);
    setImageUrl(imageURL);
  };

  const handleOptionAula = (event) => {
    const idAula = event.target.value;
    setAula(idAula);
  }
  const onMachine = async (event) => {
    event.preventDefault();
    setLoading(true);
    await addMachine({ name, brand, hard_disk, cpu, specific_features, image, aula }).then(res => {
      setLoading(false);
      console.log('respuesta de registerCompu', res);
      props.onMachine(name);// enviar un item para renderizarlo en la tabla

    }).catch(error => {
      console.log('error en register computer', error);
      setLoading(false);
    });
  }


  if (loading === true) return <Loading />

  return (
    <>
      <Button className='btn-md mt-5 mb-5' style={{ backgroundColor: " rgb(21 47 71)" }} onClick={handleShow}>
        Registrar computadora
      </Button>

      <Modal className='fade bg-secondary ' size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar computadora</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={event => onMachine(event)}
            encType="multipart/form-data">
            <div className='row'>
              <div className='col '>
                <img src={imageUrl} className='m-2 ms-5 ps-5' style={{ height: "102px", width: "auto" }} />
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Control
                    type="file"
                    autoFocus
                    name='image'
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control as="textarea" rows={1} required
                    onChange={text => setFeatures(text.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3"
                >
                  <Form.Label>Ubicacion</Form.Label>
                  <Form.Select defaultValue="Seleccione una opción..." onChange={handleOptionAula}>
                    <option value="">Seleccione una opción</option>
                    {options.map(option => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className='col'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={text => setName(text.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Marca</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={text => setBrand(text.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>CPU</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={text => setCpu(text.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Disco duro</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    onChange={text => setHardDisk(text.target.value)}
                  />
                </Form.Group>

              </div>
            </div>
            <Modal.Footer>
              <Button variant="secondary" type='submit' onClick={handleClose}>
                Cerrar
              </Button>
              <Button style={{ backgroundColor: "rgb(21 47 71)" }} type='submit' onClick={handleClose} >
                {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Registrar computadora"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>

      </Modal>
    </>
  );
}

export default Example;