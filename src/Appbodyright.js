import React, { useState, useEffect,useRef } from 'react';
import "./Appbodyright.css";
import { Avatar,IconButton,Menu,MenuItem } from "@material-ui/core";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import db from './firebase';
import firebase from "firebase"
import { useParams } from "react-router-dom";
import { useDataLayerValue } from "./DataLayer";
import InputEmoji from 'react-input-emoji';

function Appbodyright() {
    
    const [seed, setseed] = useState("");
    const [value, setvalue] = useState("");

    const { roomid } = useParams(); 
    const [ roomName , setroomName ] = useState("");
    const [ messages ,setmessages ] = useState([]);
    const [{ user },dispatch ] = useDataLayerValue();

    useEffect(() => {

        if(roomid){
            
            db.collection("room").doc(roomid).onSnapshot(snapshot => {
                setroomName(snapshot.data()?.name);
            });

        }

        if(roomid){
            
        db.collection("room").doc(roomid).collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot(snapshot => (
                setmessages(snapshot.docs.map(doc => doc.data()))
            ));

        }
    
    },[roomid]);


    useEffect(()=>{
        setseed(Math.floor(Math.random()*5000));
    },[]);
    
    
    const [ text, setText ] = useState("");

    const handleOnEnter = (text) => {
         // firebase.firestore.FieldValue.serverTimestamp() 
      
            db.collection("room").doc(roomid).collection("messages").add({
                name : user.user.displayName,
                message : text,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            });

         const val = "";
         setvalue(val);
     }


    // code for scroll down purpose
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(scrollToBottom, [messages]);
     // code for scroll down purpose

   
     // code for clear chat popup
    const [ messagesid , setmessagesid ] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);

      db.collection("room").doc(roomid).collection("messages").onSnapshot(snapshot => 
        setmessagesid(snapshot.docs.map(doc => doc.id)))
      
    };
  
    const handleClose = () => {
      setAnchorEl(null);

      if(roomid){
                messagesid.map(id => {
                    db.collection("room").doc(roomid).collection("messages")
                       .doc(id).delete().then(function() {
                         console.log("Chat history successfully deleted!");
                       }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        })
                   })
         };
    };
    

      // code for clear chat popup
      
    return (
        <div className="Appright">
            <div className="Appright_header">
             <div className="Appright_header_info">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} alt="RoomName"/>
                <div className="room_info">
                    <p className="room_name">{roomName}</p>
                    <p className="room_msg">last seen {messages[messages.length-1]?.timestamp ? new Date(messages[messages.length - 1]?.timestamp?.toDate()).toLocaleTimeString() : "Not have Any Recent Activity"}</p>
                </div>
             </div>
             <IconButton >
                <MoreVertIcon className="moreIcon" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} />
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                <MenuItem onClick={handleClose}>Clear Chat</MenuItem>
                </Menu>
             </IconButton>
            </div>


            <div className="Appright_body"  >
                
                { messages?.length > 0 && (messages.map( (message) =>(
                    <p className={`msg_decoration ${user.user.displayName === message.name && "chat_msg_sender"}`}>
                    <span className="msg_author ">
                        {message.name}
                    </span>
                        {message.message}
                    <span className="msg_time">
                        {new Date(message.timestamp?.toDate()).toLocaleTimeString("en-us")}
                    </span>
                    </p>
                )))
                }
                <div ref={messagesEndRef} />
            </div>

            <div className="Appright_footer">
          
           {/* onMouseOut = { hideEmoji } */}

              <IconButton>
                <AttachFileIcon /> 
              </IconButton> 

             <InputEmoji
                 value={text}
                 onChange={setText,setvalue}
                 cleanOnEnter
                 onEnter={handleOnEnter}
                 keepOpenend
                 disableRecent
                 placeholder="Type a message"
            />  

               {
                value===""? 
                <IconButton>
                    <MicIcon />
                </IconButton>
                    :
                <IconButton>
                    <SendIcon/>
                </IconButton>
               }
               

            </div>
        </div>
    )
}

export default Appbodyright;
