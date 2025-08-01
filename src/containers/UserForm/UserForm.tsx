import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User, UserFormState } from '../../types/UserMgmtTypes';
import { UserContext } from '../../contexts/UserContext.tsx';
import userManagementConstants from '../../utils/usermanagement-constants.ts';
import Button from '../../components/Button/Button.tsx';
import './UserForm.css';

const UserForm = () => {
    const [form, setForm] = useState<UserFormState>({
        username: '',
        email: '',
        role: ''
    });
    const initialErrorData: UserFormState = { username: '', email: '', role: '' }
    const [errors, setErrors] = useState<UserFormState>(initialErrorData);
    const userContext = useContext(UserContext)
    const navigate = useNavigate();
    const { userId } = useParams(); // userId is used by the form to differentiate between add and edit
    const { dispatch, state } = userContext

    useEffect(() => {
        if (userId && userId !== '0') {
            const { username, email, role } = state.items.find(item => item.id === userId)
            const seletedUserDetails: UserFormState = { username, email, role };
            setForm(seletedUserDetails)
        }
    }, [])

    //triggered when form is submitted
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let newErrors: UserFormState = {};
        validateUserForm(newErrors);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        userId && userId !== '0' ? editUserDetails() : addNewUserDetails();
        navigate('/userList')
    };

    //validations during submit
    const validateUserForm = newErrors => {
        const { userFormValidationMessages } = userManagementConstants;

        if (!form.username) newErrors.username = userFormValidationMessages.username.required;
        if (!form.email) newErrors.email = userFormValidationMessages.email.required;
        if (form.email && !form.email.includes('@')) newErrors.email = userFormValidationMessages.email.invalidEmail;
        if (!form.role) newErrors.role = userFormValidationMessages.role.required;
    }

    //adds a new entry to the user list
    const addNewUserDetails = () => {
        const availableIdList = state.items.map(user => Number(user.id));
        const setNewUserId = Math.max(...availableIdList) + 1;
        const newUserDetails: User = { id: setNewUserId.toString(), email: form.email, username: form.username, role: form.role, isEdit: form.role === 'user' }
        dispatch({ type: 'ADD_ITEM', payload: newUserDetails });
    }

    //updates the existing entry in the user list
    const editUserDetails = () => {
        const newUserDetails: User = { id: userId || '', email: form.email, username: form.username, role: form.role, isEdit: form.role === 'user' }
        dispatch({ type: 'UPDATE_ITEM', payload: newUserDetails });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        //clear error during typing
        if (name in errors) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <><h3>User Form</h3><form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label>User Name:</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    style={{
                        padding: '8px',
                        border: errors.username ? '1px solid red' : '1px solid #ddd',
                        borderRadius: '4px'
                    }} />
                {errors.username && <span style={{ color: 'red', fontSize: '15px' }}>{errors.username}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label>Email:</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    style={{
                        padding: '8px',
                        border: errors.email ? '1px solid red' : '1px solid #ddd',
                        borderRadius: '4px'
                    }} />
                {errors.email && <span style={{ color: 'red', fontSize: '15px' }}>{errors.email}</span>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label>Role:</label>
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    style={{
                        padding: '8px',
                        border: errors.role ? '1px solid red' : '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                {errors.role && <span style={{ color: 'red', fontSize: '15px' }}>{errors.role}</span>}
            </div>
            <Button className='submit-btn'>Submit</Button>
        </form></>
    );
};

export default UserForm;