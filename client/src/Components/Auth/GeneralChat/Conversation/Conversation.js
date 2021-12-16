import React, { useState, useEffect } from "react";
import SellerService from "../../../../Services/SellerServices/seller.service";
import UserService from "../../../../Services/UserSerivces/UserSerivces";

let userService = new UserService();
let sellerService = new SellerService();

function Conversation(props) {
  let currentUser = props.user;
  let conversation = props.conversations;
  const [users, setUser] = useState();
  const [sellers, setSeller] = useState();

  let loadSeller = () => {
    sellerService
      .getSeller(conversation.participants[1])
      .then((result) => {
        console.log(result);
        setSeller(result.data);
      })
      .catch((err) => console.log(err));
  };

  let loadUser = () => {
    userService
      .getOwner(conversation.participants[0])
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (currentUser?.role === "User") {
      loadSeller();
    } else {
      loadUser();
    }
  }, []);

  return (
    <div className="conversation mt-4 hover:bg-gray-100 hover:text-black py-4 pl-4">
      {currentUser?.role === "Seller" ? (
        <>
          <img
            className="inline-block h-10 w-10 rounded-full border-2 border-black mr-4"
            src={users?.img_url}
            alt=""
          />
          <span>{users?.username}</span>
        </>
      ) : (
        <>
          <img
            className="inline-block h-10 w-10 rounded-full border-2 border-black mr-4"
            src={sellers?.img_url}
            alt=""
          />
          <span>{sellers?.username}</span>
        </>
      )}
    </div>
  );
}

export default Conversation;
