const userManagementConstants = {
    appName: 'User Management',
    tableHeaders: {
        id: 'User ID',
        name: 'User Name',
        email: 'E-mail',
        role: 'Role'
    },
    userFormValidationMessages:{
        username:{
            required: 'Name required'
        },
        email:{
            required: 'Email required',
            invalidEmail: 'Invalid Email'
        },
        role: {
            required: 'Select a Role'
        }
    }
}

export default userManagementConstants;