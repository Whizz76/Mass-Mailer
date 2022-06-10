import './home.css';
import upload from '../../assets/upload.gif';
import valid from '../../assets/valid.gif';
import write from '../../assets/write.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Home(){
    
    const navigate=useNavigate();
    const redirect=(e)=>{
        navigate(e);
    }
    return(
        <>
        <div id="intro">
        <h1>Mass-Mailer</h1> {/* Title */}
        <p>Mass-Mailer is a mass mailing dispatcher through which anyone can send mail to a large number of recipients
            by just providing theirs and the recipients <>&nbsp;</>mail<>&nbsp;</>-<>&nbsp;</>ids<>&nbsp;</>.
        </p> {/* Introduction */}
        <button id="start" onClick={()=>redirect("/csvUpload")}>Getting Started</button> {/* button leading to file upload page */}
        </div>
        <h2>How It Works ?</h2>
        <div id="process"> {/* How mass-mailer works */}
            <img src={upload} alt="loading..." id="upload"  />
            <img src={valid} alt="loading..." id="valid"  />
            <img src={write} alt="loading..." id="write"  />
        </div>
        <button className="start" onClick={()=>redirect("/csvUpload")}  >Start Mailing</button> {/* button leading to file upload page */}
        <footer> {/* About Mass mailer(footer) */}
            <h3>About Mass-Mailer</h3>
            <p>Mass-mailer is a mass mailing dispatching software that allows users to send a mail to a 
                huge number of recipients. User uploads the csv file, containing the mail ids of various recipients
                which is then filtered on the basis of mail-ids validity and its existence. User gets a list of 
                valid mail-ids. User then writes the content to be delivered to the recipients and provides his/her mail-id.
            </p>
            <h4>copyright <>&copy;</> Aparna | Mass-Mailer | 2022 | All rights reserved</h4>
        </footer>
        
        </>
    )
}
export default Home;