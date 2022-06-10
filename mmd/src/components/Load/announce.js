import { Modal } from 'react-bootstrap';
import './modal.css';
import announce from '../../assets/announce.jpg';
function Announce(props){
    return(
        <Modal show={props.annShow} onHide={props.close}>
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <div className='announce'>
                    <div>
                <img id="announce" src={announce} alt="loading..."/></div>
                <div id="fileinfo">
                <h3>Your file <>&nbsp;</>"<>&nbsp;</>{props.info[0]}<>&nbsp;</>" <>&nbsp;</>has<>&nbsp;</>:-<>&nbsp;</></h3>
                <h3>Valid mail-ids: {props.info[1]}</h3>
                <h3>Invalid mail-ids: {props.info[2]}</h3></div></div>
            </Modal.Body>
        </Modal>
    )
}
export default Announce;