import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = (props) => {
    const [userData, setUserData] = useState({
      user: undefined,
      token: undefined,
    //   config: undefined,
    });

    return (
        <UserContext.Provider value={[userData, setUserData]}>
            {props.children}
        </UserContext.Provider>
    );
};
