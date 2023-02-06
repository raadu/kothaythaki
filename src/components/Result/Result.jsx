import { useContext } from "react";
import { AreaContext } from "../../contexts/AreaContext";
import ResultStyle from "./Result.module.scss";
import Suggestion from "../Suggestion/Suggestion";
import {getDigitBanglaFromEnglish} from '../../utils/enToBnNumberConvert';

const Result = () => {
    // Contexts
    const {searchResult, suggestions} = useContext(AreaContext);

    const RenderSearchResult = () => {
        return(
            <div>
                <div className={ResultStyle.resultText}>
                    {searchResult && Object.keys(searchResult).length > 0
                        ? `আপনি ঢাকা ${searchResult.city_corp_tag === "DNCC" ? "উত্তর (North)" : "দক্ষিণ (South)"} সিটি কর্পোরেশনে আছেন`
                        : "জানুন আপনি কোন ঢাকা সিটি কর্পোরেশনে আছেন"
                    }
                </div>
                {searchResult && Object.keys(searchResult).length > 0 ?
                    <div className={ResultStyle.wardText}>
                        ওয়ার্ড নাম্বারঃ {getDigitBanglaFromEnglish(searchResult.ward)}
                    </div> : null
                }
            </div>
        );
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