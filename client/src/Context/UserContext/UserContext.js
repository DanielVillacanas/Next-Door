import React from "react";
const UserContext = React.createContext(false);
export const UserProvider = UserContext.Provider;
export default UserContext;
export const UpdateViewContext = React.createContext(false).Provider;
