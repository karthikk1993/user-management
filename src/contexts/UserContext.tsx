import React, { createContext, ReactNode, useState } from 'react';
import { User, UserContextType } from '../types/UserMgmtTypes';

// create user context for maintaining user list and selected user data

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const initialUserListData: User[] = [];
    const initialSelectedUserData: User = { id: '', username: '', email: '', role: '', isEdit: false }
    const [userListDetails, setUserListDetails] = useState<User[]>(initialUserListData);
    const [selectedUser, setSelectedUser] = useState<User>(initialSelectedUserData);

    //providing the functions to necessary components to update the user list details and selected user details
    const addToUserListDetails = (listDetails: User[]) => {
        setUserListDetails(listDetails);
    };
    const updateSelectedUser = (selectedUserDetails: User) => {
        setSelectedUser(selectedUserDetails);
    };
    const resetUserForm = ()=>{
        setSelectedUser(initialSelectedUserData);
    }
    const value = { userListDetails, selectedUser, addToUserListDetails, updateSelectedUser, resetUserForm };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};