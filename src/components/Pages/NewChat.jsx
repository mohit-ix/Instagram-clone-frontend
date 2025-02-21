import BlueButton from "../UI/BlueButton";
import "./NewChat.css";

export default function NewChat() {
    return (
        <div className="newChat-wrap">
            <img className="sendMessage-icon" src="http://localhost:3000/images/SendMessage.png"/>
            <h2 className="sendMessage-top">Your messages</h2>
            <h4 className="sendMessage-bottom">Send a message to start a chat.</h4>
            <BlueButton >Send message</BlueButton>
        </div>
    );
}