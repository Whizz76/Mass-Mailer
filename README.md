# Mass-Mailer
Mass-Mailer is a mass mailing dispatcher through which anyone can send mail to a number of recipients by following these two steps:-

<ol>
  <li>Uploading a .csv file containing the recipients mail-addresses</li>
  <li>Providing their (Sender) name,mail id, mail subject and mail content.</li>
  </ol>
  
  ### Steps to use it on your local device
  <ol>
  <li>Clone the repository</li>
  <li> Open the folder in your text editor and follow the below steps</li>
  Terminal
 <br/>
  <ul>
    <li>Client Side</li>
    <br/>

```sh
cd mmd

```

```sh
npm install
```
```sh
npm start
```
<li> Server Side </li>
    <br/>
    
Open new Terminal
    
```sh
cd backend
```
```sh
npm install
```
Create two files inside the backend folder.
 <ul>
   <li>apiKey.js</li>
   <li>demo.js</li>
    </ul>
  
 In apiKey.js
  
```sh
  const apiKey="your sendinblue apiKey"
  module.exports=apiKey
```
In demo.js
```sh
const demoMail="Your mail address"
module.exports=demoMail
```
After that run
```sh
node app.js
```
  </ul>
Make sure that node is installed in your device.
