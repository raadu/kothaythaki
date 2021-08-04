import { useContext, useEffect, useState } from "react";
import { AreaContext } from "../../contexts/AreaContext";
import ResultStyle from "./Result.module.scss";

const Result = () => {
    // Contexts
    const {searchResult} = useContext(AreaContext);

    return (
        <div className={ResultStyle.resultContainer}>
            {searchResult && Object.keys(searchResult).length > 0 ? (
                `You are in ${searchResult.city_corporation}`
            ) : (
                "Search Which Dhaka City Corporation you belongs to"
            )}
        </div>
    );
}
 
export default Result;