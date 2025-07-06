import React from 'react';
import { TableProps } from '../../types/UserMgmtTypes.ts';
import './Table.css'
import Button from '../Button/Button.tsx';

//reuseable table component
const Table = <T,>({ rows, columns, isUpdate = false, onUserEdit, onUserDelete }: TableProps<T>) => {
    
    const EditButton = ({ row }) => {
        return (
            <Button className='edit-btn' disabled={!row.isEdit} onClick={()=>onUserEdit(row)}>Edit</Button>
        )
    }

    const DeleteButton = ({ row }) => {
        return (
            <Button className='delete-btn' disabled={!row.isEdit} onClick={()=>onUserDelete(row)}>Delete</Button>
        )
    }

    return (
        <>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                style={{ border: '1px solid black', padding: '8px' }}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row['id']}>
                            {columns.map((column) => (
                                <td
                                    key={String(column.key)}
                                    style={{
                                        border: '1px solid',
                                        padding: '8px'
                                    }}
                                >
                                    {row[column.key] as React.ReactNode}
                                </td>
                            ))}
                            {isUpdate ?
                                <td style={{
                                    border: '1px solid',
                                    padding: '8px'
                                }}>
                                    <EditButton row={row} />
                                    <DeleteButton row={row} />
                                </td> : <></>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table;