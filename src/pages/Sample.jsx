import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import axios from "axios";

const SearchComponent = () => {
    const [query, setQuery] = useState("");

    // Memoize the debounced function to persist across renders
    const debouncedSearch = useCallback(
        debounce((searchTerm) => {
            console.log("Searching for:", searchTerm);
        }, 500),
        []
    );

    useEffect(() => {
        axios.get('http://localhost:5000/profile')
          .then(res => console.log(res.data))
          .catch(err => console.log(err));
      }, []);  // Add an empty dependency array to prevent infinite requests
      

    const handleChange = (event) => {
        setQuery(event.target.value);
        debouncedSearch(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchComponent;
