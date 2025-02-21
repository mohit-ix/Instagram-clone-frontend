import "./Message.css";

export default function Message({own, message}) {
    const ownClass = own? "own" : "";

    return (
        <div className={`message-wrap ${ownClass}`}>
            <img className={`message-profile ${ownClass}`} src="http://localhost:3000/images/defaultavatar.png"/>
            <div className={`message-box ${ownClass}`}>
                {message}
            </div>
        </div>
    );
}