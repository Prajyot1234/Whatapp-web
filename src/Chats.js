import React,{useState,useEffect} from 'react';
import "./Chats.css"
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link, useParams } from "react-router-dom";


function Chats({ addNewChat , key , id ,name }) {

    const [seed, setseed] = useState("");
    
    
    useEffect(() => {
        setseed(Math.floor(Math.random()*5000));
    }, []);

    const { roomid } = useParams();
    const [Lastmessage,setLastmessage] = useState("");

    useEffect(() => {
        if(id){
            db.collection("room").doc(id).collection("messages")
            .orderBy("timestamp","desc").onSnapshot(snaphot => {
                setLastmessage(snaphot.docs.map(doc => doc.data()))
            })
        }
    }, [id]);

    const createChat =() => {
        var ChatName = prompt("Enter Your Chat Room Name > > ");

        if(ChatName){
            db.collection("room").add(
                {
                    name: ChatName,
                }
            )
        }
    }

    

    return !addNewChat ? (
        <Link to={`/${id}`}>
        <div className="chats">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="chat_info">
                <p className="chat_room_name">{name}</p>
                <p className="chat_room_msg">{Lastmessage[0]?.message}</p>
            </div>
        </div>
        </Link> 
       
    ) : (
        <div className="AddnewChat">
          <div className="NewChat">
            <h3 className="chatsh3" onClick={createChat}>Add New Chat</h3>
          </div>
        </div>
    )
}

export default Chats;
