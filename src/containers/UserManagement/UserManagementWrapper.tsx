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
    const [userListData, setUserListData] = useState<User[]>([])
    const { id, name, email, role } = userManagementConstants.tableHeaders;
    const columns: { key: keyof User; header: string; }[] = [
        { key: 'id', header: id },
        { key: 'username', header: name },
        { key: 'email', header: email },
        { key: 'role', header: role },
    ]
    const userContext = useContext(UserContext)
    const navigate = useNavigate();

    useEffect(() => {
        const data = userContext?.userListDetails.length ? userContext.userListDetails : initialUserList;
        setUserListData(data);
        userContext?.addToUserListDetails(data);
    }, [])

    const addUserDetails = () => {
        userContext?.resetUserForm();
        navigate('/userForm')
    }
    const onUserEdit = row => {
        userContext?.updateSelectedUser(row);
        navigate('/userForm')
    }
    const onUserDelete = row => {
    }

    return (
        <>
            <h3>{'User Details'}</h3>
            <Table<User> rows={userListData} columns={columns} isUpdate={true} onUserEdit={onUserEdit} onUserDelete={onUserDelete}/>
            <Button className='add-btn' onClick={addUserDetails}>Add</Button>
        </>
    );
}

export default UserManagementWrapper;