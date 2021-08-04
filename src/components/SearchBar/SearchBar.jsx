/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../contexts/AreaContext";
import SearchBarStyle from './SearchBar.module.scss';

const SearchBar = () => {
    // Context
    const {fetchAreas, filterAreaByName, areas} = useContext(AreaContext);

    // States
    const [searchString, setSearchString] = useState("");

    // Fetch area list
    useEffect(() => {
        fetchAreas();
    }, []);

    const userInputHandler = (e) => {
        if(e.keyCode !== 13 && e.key !== 'Enter') {
            setSearchString(e.target.value);
        }
        else {
            searchArea();
        }
    }

    const searchArea = () => {
        if(searchString !== "") {
            filterAreaByName(searchString);
        }
    }


    return (
        <div className={SearchBarStyle.searchBarContainer}>
            <input
                placeholder="Search Area"
                value={searchString}
                onChange={userInputHandler}
                onKeyDown={userInputHandler}
            />
            <button onClick={searchArea}>
                Search
            </button>
        </div>
    );
}
 
export default SearchBar;