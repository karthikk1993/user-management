import React from 'react';

//reuseable search component with debounce feature to use across application
const Search = ({ inputRef, handleSearchChange }) => {
    return (
        <input
            ref={inputRef}
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            style={{
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
            }}
        />
    )
}

export default Search;