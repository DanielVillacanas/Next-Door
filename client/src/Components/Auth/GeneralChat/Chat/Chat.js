import React, { useEffect, useState, useRef } from "react";
import Conversation from "../Conversation/Conversation";
import ConversationService from "../../../../Services/ConversationServices/conversation.service";
import MessagesService from "../../../../Services/MessagesServices/message.service";
import Message from "../Message/Message";
import "./Chat.css";
import SellerService from "../../../../Services/SellerServices/seller.service";
import UserService from "../../../../Services/UserSerivces/UserSerivces";

let userService = new UserService();
let sellerService = new SellerService();
let conversationService = new ConversationService();
let messagesService = new MessagesService();

function Chat(props) {
  let currentUser = props.loggedUser;
  console.log(currentUser);
  const [ListConversations, setConversations] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  let [messages, setMessages] = useState([]);
  let [user, setUser] = useState();
  let [seller, setSeller] = useState();
  const [newMessage, setNewMessage] = useState({
    text: "",
    sender: currentUser?._id,
    conversationId: currentChat?._id,
  });
  const scrollRef = useRef();

  let loadConversations = () => {
    conversationService
      .getConversations(currentUser?._id)
      .then((result) => {
        setConversations(result.data);
      })
      .catch((err) => console.log(err));
  };

  let loadMessages = (conversation) => {
    if (currentUser.role === "Seller") {
      userService
        .getOwner(conversation.participants[0])
        .then((result) => {
          setUser(result.data);
        })
        .catch((err) => console.log(err));
    } else {
      sellerService
        .getSeller(conversation.participants[1])
        .then((result) => {
          console.log(result);
          setSeller(result.data);
        })
        .catch((err) => console.log(err));
    }
    setcurrentChat(conversation?._id);
    messagesService
      .getMessages(conversation?._id)
      .then((result) => {
        setMessages((messages = result.data));
      })
      .catch((err) => console.log(err));
  };

  let handleSubmit = (e) => {
    e.preventDefault();

    messagesService
      .createMessage(newMessage.text, newMessage.sender, currentChat)
      .then((response) => {
        let copy = [...messages];
        copy.push({
          text: response.data.text,
          sender: response.data.sender,
        });
        setMessages(copy);
        setNewMessage({
          text: "",
          sender: currentUser?._id,
          conversationId: currentChat?._id,
        });
      })
      .catch((err) => console.log(err));
  };

  let handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setNewMessage((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu ">
          <div className="chatMenuWrapper border-r-2 border-gray-500 mt-2 mr-2">
            <div className="flex justify-center">
              <input
                placeholder="Busca a un vendedor"
                className="ChatMenuInput border-2 border-green-500 rounded-lg focus:ring-green-500 focus:border-green-500 appearance-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            {ListConversations?.map((conversation) => {
              return (
                <div onClick={() => loadMessages(conversation)}>
                  <Conversation
                    conversations={conversation}
                    user={currentUser}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox pr-6">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop border-b-2 border-green-400">
                  {messages?.map((message) => {
                    return (
                      <div ref={scrollRef}>
                        {currentUser.role === "User" ? (
                          <Message
                            userFromFather={seller}
                            message={message}
                            own={message.sender === currentUser?._id}
                          />
                        ) : (
                          <Message
                            userFromFather={user}
                            message={message}
                            own={message.sender === currentUser?._id}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom mt-4 ">
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                      <textarea
                        className="chatMessageInput w-full rounded-md border border-gray-500 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
                        rows={2}
                        onChange={handleInputChange}
                        type="text"
                        value={newMessage.text}
                        name="text"
                      ></textarea>
                      <button
                        type="submit"
                        className="chatSubmitButton h-8 lg:ml-4 my-auto inline-flex items-center px-4 py-2 border border-black shadow-sm text-sm font-medium rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:bg-green-500 hover:text-white hover:border-white"
                      >
                        Enviar
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <span>Empieza una conversacion...</span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
