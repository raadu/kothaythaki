import { useContext } from "react";
import { AreaContext } from "../../contexts/AreaContext";
import ResultStyle from "./Result.module.scss";
import Suggestion from "../Suggestion/Suggestion";

const Result = () => {
    // Contexts
    const {searchResult, suggestions} = useContext(AreaContext);

    const RenderSearchResult = () => {
        return searchResult && Object.keys(searchResult).length > 0
            ? `You are in ${searchResult.city_corporation}`
            : "Search Which Dhaka City Corporation you belongs to";
    }

    return (
        <div className={ResultStyle.resultContainer}>
            {suggestions?.length > 0 &&
            searchResult &&
            Object.keys(searchResult).length === 0 ? (
                <Suggestion />
            ) : (
                RenderSearchResult()
            )}
        </div>
    );
}
 
export default Result;