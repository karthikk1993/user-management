import React, { useContext, useEffect, useRef, useState } from 'react';
import Table from '../../components/Table/Table.tsx';
import { User } from '../../types/UserMgmtTypes.ts';
import Button from '../../components/Button/Button.tsx'
import userManagementConstants from '../../utils/usermanagement-constants.ts';
import './UserManagement.css';
import { UserContext } from '../../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../../hooks/useDebounce.js';
import Search from '../../components/Search/Search.tsx';

const UserManagementWrapper = () => {
    const { id, name, email, role } = userManagementConstants.tableHeaders;
    const columns: { key: keyof User; header: string; }[] = [
        { key: 'id', header: id },
        { key: 'username', header: name },
        { key: 'email', header: email },
        { key: 'role', header: role },
    ]
    const [isDelete, setIsDelete] = useState(false);
    const userContext = useContext(UserContext)
    const { state, dispatch } = userContext;
    const [userListItems, setUserListItems] = useState(state.items);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({ type: 'SET_USER_LIST', payload: state.items })
        setUserListItems(state.items);
    }, [])

    //search callback function with debouce delay of 1s
    const handleSearch = (term) => {
        setIsDelete(false);
        if (!term) {
            dispatch({ type: 'SET_USER_LIST', payload: userListItems })
        } else {
            const filtered = userListItems.filter(({ username, email }) => {
                return username.toLowerCase().includes(term.toLowerCase()) ||
                    email.toLowerCase().includes(term.toLowerCase())
            }
            );
            dispatch({ type: 'SET_USER_LIST', payload: filtered })
        }
    };

    const debouncedSearch = useDebounce(handleSearch, 1000);

    const handleSearchChange = (e) => {
        debouncedSearch(e.target.value);
    };

    //called when add button is clicked
    const addUserDetails = () => {
        const list = isDelete ? state.items : userListItems;
        dispatch({ type: 'SET_USER_LIST', payload: list })
        navigate('/userForm/0')
    }
    
    //called when edit button from row is clicked
    const onUserEdit = row => {
        const list = isDelete ? state.items : userListItems;
        dispatch({ type: 'SET_USER_LIST', payload: list })
        navigate(`/userForm/${row.id}`)
    }

    //called when delete button from row is clicked
    const onUserDelete = row => {
        setIsDelete(true);
        dispatch({ type: 'DELETE_ITEM', payload: row.id })
    }

    return (
        <>
            <h3>{'User Details'}</h3>
            <Search inputRef={inputRef} handleSearchChange={handleSearchChange} />
            <Table<User> rows={state.items} columns={columns} isUpdate={true} onUserEdit={onUserEdit} onUserDelete={onUserDelete} />
            <Button className='add-btn' onClick={addUserDetails}>Add</Button>
        </>
    );
}

export default UserManagementWrapper;