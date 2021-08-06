import React, { createContext, useState } from 'react';
// import data from "../data/city_corp.json";

export const AreaContext = createContext();

const AreaContextProvider = (props) => {
    
    const [areas, setAreas] = useState([]);
    const [searchResult, setSearchResult] = useState({});

    const fetchAreas = () => {
        console.log('fetch areas');

        fetch('city_corp.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            console.log("res", res);
            return res.json();
        })
        .then((json) => {
            console.log("json", json);
            setAreas(json);
        });
    }

    const filterAreaByName = (input) => {
        let lowerCasedInput = input.toLowerCase();

        if(areas.length > 0) {
            let result = areas && areas.find((singleArea) => {
                return singleArea.area_name.en.toLowerCase() === lowerCasedInput || singleArea.area_name.bn.toLowerCase() === lowerCasedInput;
            });
            setSearchResult(result);
            console.log("search result: ", result);
        }
    }

    return (
        <AreaContext.Provider value={{
            areas,
            fetchAreas,
            filterAreaByName,
            searchResult,
        }}>
            {props.children}
        </AreaContext.Provider>
    );
}
 
export default AreaContextProvider;
