import { Modal } from "react-bootstrap";
import './upload.css'
import upload from '../../assets/up.gif'
function Uploading(props){
    return(
        <Modal show={props.show}>
            <Modal.Header>

            </Modal.Header>
            <Modal.Body>
             <img className="uploadingg" src={upload} alt="Uploading..."/>
            </Modal.Body>
        </Modal>
    )
}
export default Uploading;