import React, { useState } from 'react';
import "./Appbodyleft.css";
import { Avatar,IconButton } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Chats from "./Chats";
import ChatIcon from '@material-ui/icons/Chat';
import db from "./firebase";
import { useDataLayerValue } from "./DataLayer";

function Appbodyleft() {

    const [room, setroom] = useState([]);

    const [{ user },dispatch] = useDataLayerValue();
 

    useState(()=>{
       db.collection("room").onSnapshot(snapshot => 
         setroom(snapshot.docs.map((doc)=>(
           {
             id : doc.id,
             data : doc.data(),
           }
         )))
       )
    },[]);

    const [ searchoption , setsearchoption ] = useState(null);
    
    const update = (e)=> {
      setsearchoption(e.target.value);
    }
    if(searchoption){
     
    }
    let filteredContact = room.filter((contact)=>{
      return (contact.data.name.toLowerCase().indexOf(searchoption) !== -1)
    }) ;

    return (
        <div className="Appleft" >
          <div className="Appleft_header">
            <div className="Appleft_header_info">
              <Avatar className="Appleft_header_avatar" src={user?.user?.photoURL} />
              <p>{user?.user?.displayName}</p>
            </div>
            <IconButton>
              <ChatIcon />
            </IconButton>            
          </div>

          <div className="Appleft_searchbar">
           <div className="searchbar">
            <SearchIcon />
            <input placeholder="Search or Create New Chat Room " value={searchoption} onChange={update}></input>
            </div>
          </div>
          
          <div className="Appleft_chat">

            <Chats addNewChat/>

            {   
              searchoption === null ?
              (
                room.map((room)=>(
                  <Chats key={room.id} id={room.id} name={room.data.name}/>
                ))
              ) : (
                filteredContact.map((room)=>(
                  <Chats key={room.id} id={room.id} name={room.data.name}/>
                ))
              )   
            }

          </div>
      
        </div>
    )
}

export default Appbodyleft;
