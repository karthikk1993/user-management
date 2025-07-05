import React, { useContext, useEffect, useState } from 'react';
import Table from '../../components/Table/Table.tsx';
import { User } from '../../types/UserMgmtTypes.ts';
import Button from '../../components/Button/Button.tsx'
import userManagementConstants from '../../utils/usermanagement-constants.ts';
import './UserManagement.css';
import { initialUserList } from '../../assets/mock/userList.js';
import { UserContext } from '../../contexts/UserContext.tsx';
import { useNavigate } from 'react-router-dom';

const UserManagementWrapper = () => {
    const { id, name, email, role } = userManagementConstants.tableHeaders;
    const columns: { key: keyof User; header: string; }[] = [
        { key: 'id', header: id },
        { key: 'username', header: name },
        { key: 'email', header: email },
        { key: 'role', header: role },
    ]
    const userContext = useContext(UserContext)
    const {state, dispatch} = userContext;
    const navigate = useNavigate();

    useEffect(() => {
        dispatch({type: 'SET_USER_LIST', payload: state.items})
    }, [])

    const addUserDetails = () => {
        navigate('/userForm/0')
    }
    const onUserEdit = row => {
        navigate(`/userForm/${row.id}`)
    }
    const onUserDelete = row => {
        dispatch({type:'DELETE_ITEM', payload:row.id})
    }

    return (
        <>
            <h3>{'User Details'}</h3>
            <Table<User> rows={state.items} columns={columns} isUpdate={true} onUserEdit={onUserEdit} onUserDelete={onUserDelete}/>
            <Button className='add-btn' onClick={addUserDetails}>Add</Button>
        </>
    );
}

export default UserManagementWrapper;