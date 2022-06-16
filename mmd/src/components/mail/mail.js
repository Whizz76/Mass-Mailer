import './mail.css';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import Load from '../Load/modal';
import loader from '../../assets/loader.jpg';
import Sending from '../sending/sending';
import Uploading from '../Load/upload';
import Helper from '../helper/helper';
function Mail(){
    const navigate=useNavigate();
    const [upshow,setUpShow]=useState(true);
    setTimeout(()=>{
        setUpShow(false)
    },3000);
    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[subject,setSubject]=useState();
    const[content,setContent]=useState();
    const [show,setShow]=useState(false);
    const [sendShow,setSendShow]=useState(false);
    const [response,setResponse]=useState();
    const [showHelper,setShowHelper]=useState(false);
    const [helpInfo,setHelpInfo]=useState();
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
        if(email===undefined || content===undefined || email==="" || content==="" || name==="" || name===undefined || subject==="" || subject===undefined){
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
        <Uploading show={upshow}/>
        <div id="mail">
        
        <h2>Write Mail</h2>
        <p>Your Name *</p>
        <input onChange={(event)=>{changeName(event)}} type="text" placeholder='Enter Your Name here...' required />
        <p>Your email-address *</p>
        <input onChange={(event)=>{changeEmail(event)}} type="email" placeholder='Enter your mail-id here...' required/>
        <p>Mail Subject *</p>
        <input onChange={(event)=>{changeSubject(event)}} type="text" placeholder='Enter your mail subject here...' required/>
        <p>Mail Content *</p>
        <textarea required onChange={(event)=>{changeContent(event)}} placeholder='Write your mail content here...'></textarea>
        <div id="helper"><button onClick={()=>{
            setHelpInfo("link");
            setShowHelper(true);
        }} >Insert link?</button><button
        onClick={()=>{
            setHelpInfo("mail");
            setShowHelper(true);
        }}>View recipients</button></div>
        <button onClick={(event)=>{change(event)
        }} className='mail'>Mail</button>
       
        <Load show={show} close={closeIt} content={"Please fill all the required* fields."} image={loader}/>
        <Sending response={response} show={sendShow}/>
        <Helper info={helpInfo} show={showHelper} hide={()=>{
            setShowHelper(false);
        }}/>
        </div>
        
        </>
    )
}
export default Mail;