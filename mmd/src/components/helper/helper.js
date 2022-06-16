import './helper.css';
import { Modal } from 'react-bootstrap'
import { useState } from 'react'
function Helper(props) {
    const [mail, setMail] = useState([]);
    if (props.info == "mail") {
        fetch("http://localhost:7800/get/receiver/mails", {
            method: "GET",
            headers: { "content-type": "application/json" }
        }).then(res => res.json()).then(result => setMail(result.mails)).catch(err => console.error(err));


    }
    return (
        <Modal show={props.show} onHide={props.hide}>
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body>
                <div className='helper'>
                    {
                        props.info === "link" ? (
                            <>
                                <p>To insert any link with a text display just write "<>&lt;</>a href="your link"<>&gt;</> Text to display <>&lt;</>/a<>&gt;</> </p>
                                <a id="helper">Text to display</a>
                            </>
                        ) : (<>
                            <p>Recipient's Mail-ids</p>
                            <div>
                                {
                                    mail.length != 0 ? (

                                        mail.map(r => (
                                            <p>{r}</p>
                                        ))

                                    ) : (<>
                                        <div className="spinner-border text-light" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                            
                                        </div>
                                    </>)
                                }
                            </div>
                        </>


                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default Helper;