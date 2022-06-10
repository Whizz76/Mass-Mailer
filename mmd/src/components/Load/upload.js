import { Modal } from "react-bootstrap";
import upload from '../../assets/up.gif'
function Uploading(props){
    return(
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
             <img src={upload} alt="loading..."/>
            </Modal.Body>
        </Modal>
    )
}
export default Uploading;