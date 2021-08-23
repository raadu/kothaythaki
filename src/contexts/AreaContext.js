import React, { createContext, useState } from 'react';
// import data from "../data/city_corp.json";

export const AreaContext = createContext();

const AreaContextProvider = (props) => {
    
    // States
    const [areas, setAreas] = useState([]);
    const [searchResult, setSearchResult] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [initialDataLoading, setInitialDataLoading] = useState(false);
    const [suggestionsLoading, setSuggestionsLoading] = useState(false);
    const [matchedLang, setMatchedLang] = useState("");

    const fetchAreas = () => {
        setInitialDataLoading(true);

        fetch('city_corp.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((json) => {
            console.log("json", json);
            // let dataFound = [...json];
            // dataFound.forEach((item) => {
            //     item.id = uuid();
            // });
            // console.log(JSON.stringify(dataFound));
            setAreas(json);
            setInitialDataLoading(false);
        });
    }

    const filterAreaByName = (input) => {
        console.log('input: ', input);
        
        let lowerCasedInput = input.toLowerCase();

        if(areas.length > 0) {
            let result = areas && areas.find((singleArea) => {
                return singleArea.area_name.en.toLowerCase() === lowerCasedInput || singleArea.area_name.bn.toLowerCase() === lowerCasedInput;
            });
            setSearchResult(result);
        }
    }

    const searchSuggestions = (input) => {
        if(input === "") {
            setSuggestions([]);
        }
        else {
            let lowerCasedInput = input.toLowerCase();

            if(areas.length > 0) {
                setSuggestionsLoading(true);

                let result = areas && areas.filter((singleArea) => {
                    if(singleArea.area_name.en.toLowerCase().includes(lowerCasedInput)) {
                        setMatchedLang("en");
                        setSearchResult({});
                        return singleArea.area_name.en.toLowerCase().includes(lowerCasedInput);
                    }
                    if(singleArea.area_name.bn.toLowerCase().includes(lowerCasedInput)) {
                        setMatchedLang("bn");
                        setSearchResult({});
                        return singleArea.area_name.bn.toLowerCase().includes(lowerCasedInput);
                    }
                    // return null;
                });

                setSuggestions(result);
                setSuggestionsLoading(false);
            }
        }
    }

    const clearSearchResult = () => {
        setSearchResult({});
        setSuggestions([]);
    }

    return (
        <AreaContext.Provider value={{
            areas,
            fetchAreas,
            filterAreaByName,
            searchResult,
            searchSuggestions,
            initialDataLoading,
            suggestionsLoading,
            suggestions,
            matchedLang,
            clearSearchResult,
        }}>
            {props.children}
        </AreaContext.Provider>
    );
}
 
export default AreaContextProvider;
