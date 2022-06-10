import './modal.css';
import loader from '../../assets/loader.jpg';
import {Modal,Button} from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';
function Load(props){
    return(
        <Modal  show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                
            </Modal.Header>
            <Modal.Body>
                <h2 id="select">{props.content}</h2>
               <img id="uploader" src={props.image} alt="loading..."/>
            </Modal.Body>
            
            
        </Modal>
    )
}
export default Load;