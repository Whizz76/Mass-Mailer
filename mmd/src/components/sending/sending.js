import './sending.css';
import {Modal} from 'react-bootstrap';
import {useState} from 'react';
import sending from '../../assets/Sending.gif'
import sent from '../../assets/sent.gif';
function Sending(props){
    return(
        <>
        <Modal show={props.show}>
            <Modal.Header id="header">
            </Modal.Header>
            <Modal.Body>
                <h3 id="mailInformation">
            {
                       props.response=="sending"?(
                           <>Sending your mail...</>
                       ):(
                           <>Mail sent</>
                       )
                   }
                   </h3>
                   <div id="mailImage">
                {
                    props.response=="sending"?(
                        <>
                        <img src={sending} alt="loading..."/>
                        <p>Please don't leave this page while we send your mails</p>
                        </>
                    ):(
                        <img src={sent} alt="loading..."/>
                    )

                }
                </div>
              
            </Modal.Body>
        </Modal>

        </>
    )
}
export default Sending;