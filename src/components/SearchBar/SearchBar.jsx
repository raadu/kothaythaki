/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../contexts/AreaContext";
import SearchBarStyle from './SearchBar.module.scss';
import searchIcon from '../../assets/icons/search.svg';
import cancelIcon from '../../assets/icons/cancel.svg';

const SearchBar = () => {
    // Context
    const {fetchAreas, searchSuggestions, searchResult, matchedLang, clearSearchResult} = useContext(AreaContext);

    // States
    const [searchString, setSearchString] = useState("");

    // Fetch area list
    useEffect(() => {
        fetchAreas();
    }, []);

    const userInputHandler = (e) => {
        if(e.keyCode !== 13 && e.key !== 'Enter') {
            setSearchString(e.target.value);
            searchSuggestions(e.target.value);
        }
        else {
            // searchArea();
        }
    }


    const clearInput = () => {
        setSearchString("");
        clearSearchResult();
    }

    return (
        <div className={SearchBarStyle.searchBarContainer}>
            <div 
                className={SearchBarStyle.iconContainer}
                onClick={searchString ? clearInput : null}
            >
                <img
                    className={SearchBarStyle.icon}
                    src={searchString ? cancelIcon : searchIcon}
                    alt="Search"
                    width={searchString ? "18" : "22"}
                    height={searchString ? "18" : "22"}
                />
            </div>
            
            <input
                className={SearchBarStyle.searchInput}
                placeholder="এলাকার নাম"
                value={searchResult?.area_name ? searchResult.area_name[matchedLang] : searchString}
                onChange={userInputHandler}
            />
        </div>
    );
}
 
export default SearchBar;
