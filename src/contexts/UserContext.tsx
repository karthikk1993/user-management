import React, { createContext, ReactNode, useReducer } from 'react';
import { UserContextType, Action, State } from '../types/UserMgmtTypes';
import { initialUserList } from '../assets/mock/userList'

// create user context for maintaining user list and selected user data

const initialState = {
    items: initialUserList
};

export const UserContext = createContext<UserContextType>({
    state: initialState,
    dispatch: () => null,
});


const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_USER_LIST':
            return { items: action.payload };
        case 'ADD_ITEM':
            return { ...state, items: [...state.items, action.payload] };
        case 'DELETE_ITEM':
            const deleteIndex = state.items.findIndex(item => item.id === action.payload);
            const list = [...state.items];
            list.splice(deleteIndex, 1)
            return {
                ...state,
                items: list
            };
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, ...action.payload }
                        : item
                ),
            };
        default:
            return state;
    }
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};