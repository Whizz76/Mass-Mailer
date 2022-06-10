import './mail.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Load from '../Load/modal';
import loader from '../../assets/loader.jpg';
import Sending from '../sending/sending';
function Mail(){
    const navigate=useNavigate();
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[subject,setSubject]=useState();
    const[content,setContent]=useState();
    const [show,setShow]=useState(false);
    const [sendShow,setSendShow]=useState(false);
    const [response,setResponse]=useState();
   
    const closeIt=()=>{
        setShow(false);
    }
    const changeName=(e)=>{
        setName(e.target.value);
    }
    const changeEmail=(e)=>{
        setEmail(e.target.value);
    }
    const changeSubject=(e)=>{
        setSubject(e.target.value);
    }
    const changeContent=(e)=>{
        setContent(e.target.value);
    }
    const change=(e)=>{
        e.preventDefault();
        if(subject===undefined){
            setSubject("");
        }
        if (name===undefined){
            setName("");
        }
        if(email===undefined || content===undefined || email==="" || content===""){
            setShow(true);
        }
        else{
        setSendShow(true);
        setResponse("sending");
        fetch("http://localhost:7800/sendMail",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify({
                name:`${name}`,
                mail:`${email}`,
                subject:`${subject}`,
                content:`${content}`,
            })
        }).then(res=>res.json()).then(result=>{
            if(result.msg=="success"){
                setResponse(result.msg);
                setTimeout(()=>{
                    setSendShow(false);
                },3000);
            }
            else if(result.msg=="failed"){
                setSendShow(false);
                alert("Some error occurred! Please try again after some time");
            }
        console.log(result)}).catch(err=>{console.log(err);
            setSendShow(false);
            alert("Some error occurred! Please try again after some time")
            
        });
        
    }
}

    return(
        <>
        
        <div id="mail">
        <h2>Write Mail</h2>
        <p>Your Name (Optional)</p>
        <input onChange={(event)=>{changeName(event)}} type="text" placeholder='Enter Your Name here...' />
        <p>Your email-address *</p>
        <input onChange={(event)=>{changeEmail(event)}} type="email" placeholder='Enter your mail-id here...' required/>
        <p>Mail Subject (Optional)</p>
        <input onChange={(event)=>{changeSubject(event)}} type="text" placeholder='Enter your mail subject here...'/>
        <p>Mail Content *</p>
        <textarea required onChange={(event)=>{changeContent(event)}} placeholder='Write your mail content here...'></textarea>
        <button onClick={(event)=>{change(event)}} className='mail'>Mail</button>
        <Load show={show} close={closeIt} content={"Please atleast fill the required* fields."} image={loader}/>
        <Sending response={response} show={sendShow}/>
        
        </div>
        
        </>
    )
}
export default Mail;