import React, { useEffect, useState, useRef } from "react";
import Conversation from "../Conversation/Conversation";
import ConversationService from "../../../../Services/ConversationServices/conversation.service";
import MessagesService from "../../../../Services/MessagesServices/message.service";
import Message from "../Message/Message";
import ConversationPhoto from "../../../../images/Conversation.png";
import "./Chat.css";
import { Link } from "react-router-dom";
import SellerService from "../../../../Services/SellerServices/seller.service";
import UserService from "../../../../Services/UserSerivces/UserSerivces";
import { io } from "socket.io-client";
import { Icon } from "@iconify/react";

let userService = new UserService();
let sellerService = new SellerService();
let conversationService = new ConversationService();
let messagesService = new MessagesService();

function Chat(props) {
  let currentUser = props.loggedUser;
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
  let socket = useRef();
  let [arrivalMessage, setArrivalMessage] = useState(null);

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
        .getOwner(conversation?.participants[0])
        .then((result) => {
          setUser(result.data);
        })
        .catch((err) => console.log(err));
    } else {
      sellerService
        .getSeller(conversation?.participants[1])
        .then((result) => {
          setSeller(result.data);
        })
        .catch((err) => console.log(err));
    }
    setcurrentChat(conversation);
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
      .createMessage(newMessage.text, newMessage.sender, currentChat?._id)
      .then((response) => {
        let copy = [...messages];
        copy.push({
          text: response.data.text,
          sender: response.data.sender,
        });
        socket.current.emit("sendMessageRomm", currentChat?._id, {
          senderId: currentUser?._id,
          text: newMessage.text,
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
    if (props.conversationFromSeller !== undefined) {
      setcurrentChat(props.conversationFromSeller);
      loadMessages(props.conversationFromSeller);
    }
    loadConversations();
    currentChat && loadMessages(currentChat);
  }, []);

  useEffect(() => {
    socket.current = io(`${process.env.REACT_APP_SOCKET_URL}`);
    let room = currentChat?._id;
    socket.current.on(`sentToFront${room}`, (data) => {
      setArrivalMessage({
        text: data.text,
      });
      currentChat && loadMessages(currentChat);
    });
  }, [currentChat, arrivalMessage]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.participants.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu ">
          <div className="chatMenuWrapper border-r-2 border-green-500 mt-2 mr-2  text-white  ">
            {ListConversations?.map((conversation) => {
              return (
                <Link
                  to={`/chat/${conversation._id}`}
                  onClick={() => loadMessages(conversation)}
                >
                  <Conversation
                    conversations={conversation}
                    user={currentUser}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="chatBox pr-6">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop border-b-2 border-green-500">
                  <svg
                    width="205"
                    id="logoBackgorund"
                    height="78"
                    viewBox="0 0 205 78"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M22.5 31.5C22.5 22.6634 29.6634 15.5 38.5 15.5C47.3366 15.5 54.5 22.6634 54.5 31.5V57H49.5V31.5C49.5 25.4249 44.5751 20.5 38.5 20.5C32.4249 20.5 27.5 25.4249 27.5 31.5V57H22.5V31.5Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M49.5 57V62H27.5002C27.5001 62 27.5 62 27.5 59.5C27.5 57 27.5001 57 27.5002 57H49.5Z"
                      fill="white"
                    />
                    <path
                      d="M46 40.5C46 42.1569 44.6569 43.5 43 43.5C41.3431 43.5 40 42.1569 40 40.5C40 38.8431 41.3431 37.5 43 37.5C44.6569 37.5 46 38.8431 46 40.5Z"
                      fill="white"
                    />
                    <path
                      d="M78.7675 48L72.355 37.5825H72.2875L72.3775 48H68.6425V32.07H73.03L79.42 42.465H79.4875L79.3975 32.07H83.1325V48H78.7675ZM93.9334 41.115C93.9334 40.53 93.7459 40.0275 93.3709 39.6075C93.0109 39.1875 92.4634 38.9775 91.7284 38.9775C91.3684 38.9775 91.0384 39.0375 90.7384 39.1575C90.4384 39.2625 90.1759 39.4125 89.9509 39.6075C89.7259 39.8025 89.5459 40.035 89.4109 40.305C89.2759 40.56 89.2009 40.83 89.1859 41.115H93.9334ZM97.3309 42.5325C97.3309 42.6825 97.3309 42.8325 97.3309 42.9825C97.3309 43.1325 97.3234 43.275 97.3084 43.41H89.1859C89.2159 43.725 89.3059 44.01 89.4559 44.265C89.6209 44.52 89.8234 44.745 90.0634 44.94C90.3184 45.12 90.5959 45.2625 90.8959 45.3675C91.2109 45.4725 91.5334 45.525 91.8634 45.525C92.4484 45.525 92.9434 45.42 93.3484 45.21C93.7534 44.985 94.0834 44.7 94.3384 44.355L96.9034 45.975C96.3784 46.74 95.6809 47.3325 94.8109 47.7525C93.9559 48.1575 92.9584 48.36 91.8184 48.36C90.9784 48.36 90.1834 48.2325 89.4334 47.9775C88.6834 47.7075 88.0234 47.325 87.4534 46.83C86.8984 46.32 86.4559 45.6975 86.1259 44.9625C85.8109 44.2275 85.6534 43.3875 85.6534 42.4425C85.6534 41.5275 85.8109 40.7025 86.1259 39.9675C86.4409 39.2175 86.8684 38.5875 87.4084 38.0775C87.9484 37.5525 88.5859 37.1475 89.3209 36.8625C90.0559 36.5775 90.8509 36.435 91.7059 36.435C92.5309 36.435 93.2884 36.5775 93.9784 36.8625C94.6684 37.1325 95.2609 37.53 95.7559 38.055C96.2509 38.58 96.6334 39.2175 96.9034 39.9675C97.1884 40.7175 97.3309 41.5725 97.3309 42.5325ZM106.764 48L104.356 44.5575L101.881 48H97.6063L102.084 42.1275L98.0338 36.795H102.331L104.424 39.7875L106.539 36.795H110.701L106.674 42.1275L111.106 48H106.764ZM116.478 39.5625V43.8375C116.478 44.3625 116.576 44.76 116.771 45.03C116.981 45.285 117.348 45.4125 117.873 45.4125C118.053 45.4125 118.241 45.3975 118.436 45.3675C118.646 45.3375 118.818 45.2925 118.953 45.2325L118.998 47.9325C118.743 48.0225 118.421 48.0975 118.031 48.1575C117.641 48.2325 117.251 48.27 116.861 48.27C116.111 48.27 115.481 48.18 114.971 48C114.461 47.805 114.048 47.535 113.733 47.19C113.433 46.83 113.216 46.41 113.081 45.93C112.946 45.435 112.878 44.8875 112.878 44.2875V39.5625H111.078V36.795H112.856V33.8475H116.478V36.795H119.111V39.5625H116.478ZM141.545 39.99C141.545 41.385 141.282 42.5925 140.757 43.6125C140.247 44.6175 139.565 45.45 138.71 46.11C137.87 46.755 136.917 47.235 135.852 47.55C134.787 47.85 133.707 48 132.612 48H126.672V32.07H132.432C133.557 32.07 134.667 32.205 135.762 32.475C136.857 32.73 137.832 33.165 138.687 33.78C139.542 34.38 140.232 35.19 140.757 36.21C141.282 37.23 141.545 38.49 141.545 39.99ZM137.54 39.99C137.54 39.09 137.39 38.3475 137.09 37.7625C136.805 37.1625 136.415 36.69 135.92 36.345C135.44 35.985 134.885 35.73 134.255 35.58C133.64 35.43 133.002 35.355 132.342 35.355H130.43V44.67H132.252C132.942 44.67 133.602 44.595 134.232 44.445C134.877 44.28 135.44 44.0175 135.92 43.6575C136.415 43.2975 136.805 42.8175 137.09 42.2175C137.39 41.6175 137.54 40.875 137.54 39.99ZM155.774 42.3525C155.774 43.2675 155.609 44.1 155.279 44.85C154.949 45.585 154.499 46.215 153.929 46.74C153.359 47.25 152.699 47.6475 151.949 47.9325C151.199 48.2175 150.397 48.36 149.542 48.36C148.702 48.36 147.899 48.2175 147.134 47.9325C146.384 47.6475 145.724 47.25 145.154 46.74C144.599 46.215 144.157 45.585 143.827 44.85C143.497 44.1 143.332 43.2675 143.332 42.3525C143.332 41.4375 143.497 40.6125 143.827 39.8775C144.157 39.1425 144.599 38.52 145.154 38.01C145.724 37.5 146.384 37.11 147.134 36.84C147.899 36.57 148.702 36.435 149.542 36.435C150.397 36.435 151.199 36.57 151.949 36.84C152.699 37.11 153.359 37.5 153.929 38.01C154.499 38.52 154.949 39.1425 155.279 39.8775C155.609 40.6125 155.774 41.4375 155.774 42.3525ZM152.219 42.3525C152.219 41.9925 152.159 41.64 152.039 41.295C151.919 40.95 151.747 40.65 151.522 40.395C151.297 40.125 151.019 39.9075 150.689 39.7425C150.359 39.5775 149.977 39.495 149.542 39.495C149.107 39.495 148.724 39.5775 148.394 39.7425C148.064 39.9075 147.787 40.125 147.562 40.395C147.352 40.65 147.187 40.95 147.067 41.295C146.962 41.64 146.909 41.9925 146.909 42.3525C146.909 42.7125 146.962 43.065 147.067 43.41C147.187 43.755 147.359 44.07 147.584 44.355C147.809 44.625 148.087 44.8425 148.417 45.0075C148.747 45.1725 149.129 45.255 149.564 45.255C149.999 45.255 150.382 45.1725 150.712 45.0075C151.042 44.8425 151.319 44.625 151.544 44.355C151.769 44.07 151.934 43.755 152.039 43.41C152.159 43.065 152.219 42.7125 152.219 42.3525ZM169.99 42.3525C169.99 43.2675 169.825 44.1 169.495 44.85C169.165 45.585 168.715 46.215 168.145 46.74C167.575 47.25 166.915 47.6475 166.165 47.9325C165.415 48.2175 164.613 48.36 163.758 48.36C162.918 48.36 162.115 48.2175 161.35 47.9325C160.6 47.6475 159.94 47.25 159.37 46.74C158.815 46.215 158.373 45.585 158.043 44.85C157.713 44.1 157.548 43.2675 157.548 42.3525C157.548 41.4375 157.713 40.6125 158.043 39.8775C158.373 39.1425 158.815 38.52 159.37 38.01C159.94 37.5 160.6 37.11 161.35 36.84C162.115 36.57 162.918 36.435 163.758 36.435C164.613 36.435 165.415 36.57 166.165 36.84C166.915 37.11 167.575 37.5 168.145 38.01C168.715 38.52 169.165 39.1425 169.495 39.8775C169.825 40.6125 169.99 41.4375 169.99 42.3525ZM166.435 42.3525C166.435 41.9925 166.375 41.64 166.255 41.295C166.135 40.95 165.963 40.65 165.738 40.395C165.513 40.125 165.235 39.9075 164.905 39.7425C164.575 39.5775 164.193 39.495 163.758 39.495C163.323 39.495 162.94 39.5775 162.61 39.7425C162.28 39.9075 162.003 40.125 161.778 40.395C161.568 40.65 161.403 40.95 161.283 41.295C161.178 41.64 161.125 41.9925 161.125 42.3525C161.125 42.7125 161.178 43.065 161.283 43.41C161.403 43.755 161.575 44.07 161.8 44.355C162.025 44.625 162.303 44.8425 162.633 45.0075C162.963 45.1725 163.345 45.255 163.78 45.255C164.215 45.255 164.598 45.1725 164.928 45.0075C165.258 44.8425 165.535 44.625 165.76 44.355C165.985 44.07 166.15 43.755 166.255 43.41C166.375 43.065 166.435 42.7125 166.435 42.3525ZM179.594 39.81C179.429 39.765 179.264 39.735 179.099 39.72C178.949 39.705 178.799 39.6975 178.649 39.6975C178.154 39.6975 177.734 39.7875 177.389 39.9675C177.059 40.1475 176.789 40.365 176.579 40.62C176.384 40.875 176.242 41.1525 176.152 41.4525C176.062 41.7525 176.017 42.015 176.017 42.24V48H172.327V36.795H175.882V38.415H175.927C176.212 37.845 176.617 37.38 177.142 37.02C177.667 36.66 178.274 36.48 178.964 36.48C179.114 36.48 179.257 36.4875 179.392 36.5025C179.542 36.5175 179.662 36.54 179.752 36.57L179.594 39.81Z"
                      fill="white"
                    />
                    <path
                      d="M147.5 51L148.013 51.4861C152.974 56.1861 160.808 55.9683 165.5 51V51"
                      stroke="white"
                      stroke-width="3"
                    />
                  </svg>

                  {messages?.map((message) => {
                    return (
                      <div ref={scrollRef}>
                        {currentUser?.role === "User" ? (
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
                <div className="chatBoxBottom mt-4">
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                      <textarea
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                        className="chatMessageInput pl-4 pt-1 w-full rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-500"
                        onChange={handleInputChange}
                        type="text"
                        rows={1}
                        value={newMessage.text}
                        name="text"
                      ></textarea>
                      <button
                        type="submit"
                        className="chatSubmitButton lg:ml-4 py-2"
                      >
                        <Icon
                          icon="fluent:send-28-filled"
                          color="white"
                          width="30"
                        />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <img src={ConversationPhoto} id="ConversationBackgorund"></img>
                <p
                  className="text-white text-4xl mx-auto"
                  id="ConversationSpan"
                >
                  Empieza una conversacion...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
