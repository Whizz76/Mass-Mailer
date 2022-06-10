import { Modal } from "react-bootstrap";
import './invalid.css'
function Invalid(props){
    
    return(
        <>
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {
                        props.invalidMails.length>1?(
                            <>
                            Invalid mail ids
                            </>
                        ):(<>No invalid mail-id present</>)
                    }
                    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>
                {
                    props.invalidMails.length>0?(
                        <>
                {
                    props.invalidMails.map(r=>(
                        <p className="invalidMail" key={props.invalidMails.indexOf(r)}>{r}</p>
                    ))
                }
                </>

                    ):(<></>)
                }
                </>
                
            </Modal.Body>
        </Modal>
        </>
    )
}
export default Invalid;