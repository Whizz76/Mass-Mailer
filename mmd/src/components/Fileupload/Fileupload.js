import './Fileupload.css';
import { useRef, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import loader from '../../assets/loader.jpg';
import info from '../../assets/info.gif';
import * as EmailValidator from 'email-validator';
import {CSVLink, CSVDownload} from 'react-csv';
import Announce from '../Load/announce';
import Load from '../Load/modal';
import Uploading from '../Load/upload';
import Invalid from '../Invalid/invalid';
function Fileupload(){
    const [invalid,setInvalid]=useState([]) // for storing mail-ids.
    const [showInvalid,setShowInvalid]=useState(false);
    const [image,setImage]=useState(loader);
    const [content,setContent]=useState("Please select a csv file");
    const proceed=useRef(null); // for the proceed button at the bottom of the page
    const[show,setShow]=useState(false); // for the "PLease upload csv file" modal. This modal shows up whenever user trie to import a csv file without even selecting a csv file.
    const [announceShow,setAnnounceShow]=useState(false); // for the "file Info" modal that shows up whenever a user uploads the csv file. The modal contains info such as filename,no.of valid and invalid mails.
    const [selectFile,setSelectFile]=useState("Select .csv file");
    const [csvArrayOfEmails,setCsvArrayOfEmails]=useState([]);  // is a array of objects, where keys="valid mail-ids" values are the valid mail ids
    const [fileinfo,setFileInfo]=useState([]); // contains information related to the file uploaded.
    const navigate=useNavigate(); // navigating to different pages
    const [upshow,setUpShow]=useState(true);
    var randomNumber=Math.floor(Math.random()*100000)+Math.floor(Math.random()*10000)+Math.floor(Math.random()*1000)+Math.floor(Math.random()*100)+Math.floor(Math.random()*10);
    setTimeout(()=>{
        setUpShow(false)
    },3000);
    const moveTo=(e)=>{
        fetch("http://localhost:7800/receiverMails",{
            method:"POST",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(
                {
                    mails:`${Array}`
                }
            )
        }).then(res=>res.json()).then(result=>{
            if(result.msg==200){
                alert("Your recipient addresses are added and you are now going to get directed to mail page");
                navigate(e);
            }
        }).catch(err=>alert("some error occurred! please try again after some time"))
        
    }
    const closeIt=()=>{ // to close modal
        setShow(false);
        setAnnounceShow(false);
    }
    const download=useRef(null); // reference to "download valid mails" button. Only shows up when user imports a csv file.

    const [file,setFile]=useState(); // to store the current uploaded file
    const [Array,setArray]=useState([]); // stores the valid mail ids
    var [check,setCheck]=useState(0); // to check whether user has actually selected a valid, whenever he tries to import file
   var csvRows=[]; // for storing the various mail ids
    const csvtoArray=arr=>{ 
         // function to store valid mail ids in Array, store various file info like their name and no.of valid and invalid ids, show announce modal, containing various info,form array of objects from the given array, show up download and proceed buttons.
        
        csvRows=arr.slice(arr.indexOf("\n")+1).split("\n");
        var csvArray=[...new Set(csvRows.map(r=>r.substr(0,r.length-1)))];
        var filteredArray=csvArray.filter(r=>EmailValidator.validate(r)===true);
        var invalidMails=csvArray.filter(r=>EmailValidator.validate(r)==false);
        setInvalid(invalidMails);
        setArray(filteredArray);
        fileinfo[0]=`${file.name}`;
        fileinfo[1]=`${filteredArray.length}`;
        fileinfo[2]=`${csvArray.length-filteredArray.length-1}`;
        setFileInfo(fileinfo);
        setAnnounceShow(true);
        var downloadCsv=[];
        filteredArray.forEach(r=>{
            var obj={};
            obj["Valid-emails"]=`${r}`;
            downloadCsv.push(obj);
        })
        setCsvArrayOfEmails(downloadCsv);
        //download.current.classList.remove("none");
        //download.current.classList.add("csv");
        //proceed.current.classList.remove('none');
        
    }
    const fileReader=new FileReader(); // file reader object
    const handleChange=(e)=>{ // whenever onchange, it sets file to the current chosen file and turn check+=1 , if the file is defined

        setFile(e.target.files[0]);
        if(e.target.files[0]){
            setCheck(0);
            setShow(false);
            setSelectFile(`${e.target.files[0].name}`)
        }
        else{
            setArray([]);
            setInvalid([]);
            setCheck(0);
        }
        
        
    };
    const downloadCsv=()=>{
        setImage(info);
        setContent("You will have to save this downloaded file in .csv format in your device for any further use!")
        setShow(true);
        }
    var csvOutput;
    const handleSubmit=(e)=>{
        e.preventDefault();
        
        if(file){
               fileReader.onload=function(event){
               csvOutput=event.target.result;
               check+=1;
               setCheck(check);
               setSelectFile("Select new file");
               csvtoArray(csvOutput);
                                                                                           
            };
            fileReader.readAsText(file);
        }
        else{
            if(check==0){
                setImage(loader);
                setContent("Please select a csv file")
                setShow(true);
            }
            else{
                alert("loading....");
            }
           
        }

    };
    return(
        <>
        <Uploading show={upshow}/>
        <div className='upload'>
        <Load show={show} close={closeIt} content={content} image={image} />
        <h2>Choose a csv file</h2>
        <form>
        <input className='file' id="file" type={"file"} accept={".csv"} onChange={(event)=>{handleChange(event)}} /><label htmlFor="file">{selectFile}</label>
        <button className='csv' onClick={(event)=>{handleSubmit(event)}}>{check===0?(<>Import Csv</>):(<>File Info</>)}</button></form>
        <>
        {
            check!=0?(
                <button onClick={()=>{
                    setShowInvalid(true);
                }} className='csv'>View Invalid-mail ids</button>):(<></>)
        }
        </>
        <>
          {
              check!=0?(<>
              <CSVLink className='download' style={{"textDecoration":"none","color":"#142865"}}  data={csvArrayOfEmails}><button className='csv' onClick={downloadCsv} ref={download} >Download valid mail-ids</button></CSVLink>
              </>):(<></>)
          }
        </>
        <Invalid show={showInvalid} invalidMails={invalid} close={()=>{setShowInvalid(false)}}/>
        <div>
            <>
            {
                check!=0?(
                    <>
                    {
                Array.length===0?
                   (<>
                   <p></p>
                   </>)
                :
                (<>
                <Announce annShow={announceShow} close={closeIt} info={fileinfo}/>
                <table>
                     <thead>
                    <tr>
                        <th>Valid Email-ids</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.map(item=>(
                        <tr  key={Array.indexOf(item)}>
                            <td>{item}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                </>)
            }
            
                    </>
                ):(<></>)
            }
            </>

            
        </div>
        </div>
        <>
        {
            check!=0?(
                <button id="proceed" className='csv' ref={proceed} onClick={()=>{
                    window.scrollTo(0,0);
                    moveTo("/mail/"+randomNumber)}}>Proceed   -<>&gt;</></button>
        

            ):(
                <></>
            )
        }
        </>
        </>
    )
}
export default Fileupload;