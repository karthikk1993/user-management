
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isEdit: boolean;
}

export interface UserContextType {
  userListDetails: Array<User>;
  selectedUser: User;
  addToUserListDetails: (listDetails: User[])=> void;
  updateSelectedUser: (selectedUserDetails: User)=> void;
  resetUserForm: () => void;
};

export interface TableProps<T> {
  rows: T[];
  columns: {
    key: keyof T;
    header: string;
  }[];
  isUpdate: boolean;
  onUserEdit: (selectedUserDetails: User)=> void;
  onUserDelete: (selectedUserDetails: User)=> void;
};

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export interface UserFormProps {
    onSubmit: (prevState: any, formData: FormData) => Promise<any>;
};

export interface UserFormState {
  username: string;
  email: string;
  role: string;
};