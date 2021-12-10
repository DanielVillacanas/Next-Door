import React, { useState } from "react";
import EditProfile from "./EditProfile";
import "./UserProfile.css";

export default function UserProfile(props) {
  const [modal, showmodal] = useState(false);

  let user = props.loggedUser?.loggedUser;
  console.log(user);
  let handleOnclick = () => {
    showmodal(true);
  };

  return (
    <div className="profile">
      <div className="img">
        <img src={user?.img_url} alt="Img User"></img>
      </div>
      <div className="info">
        <label>
          Nombre de Usuario:
          <div className="data">
            <h3>{user?.username}</h3>
          </div>
        </label>
        <label>
          Email:
          <div className="data">
            <h3>{user?.email}</h3>
          </div>
        </label>
        <label>
          Direccion:
          <div className="data">
            <h3>{user?.address}</h3>
          </div>
        </label>
      </div>
      <button onClick={handleOnclick}>Editar Perfil</button>

      {modal && <EditProfile user={user} storeUser={props.storeUser} />}
    </div>
  );
}
