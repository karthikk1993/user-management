
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  isEdit: boolean;
}

export interface State {
  items: User[];
}

export type Action =
  | { type: 'ADD_ITEM'; payload: User }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: User }
  | { type: 'SET_USER_LIST'; payload: User[]}
  | { type: 'RESET'}


export interface UserContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
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