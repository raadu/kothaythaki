import SuggestionStyle from './Suggestion.module.scss';
import { useContext } from 'react';
import { AreaContext } from '../../contexts/AreaContext';

const Suggestion = () => {
    // Contexts
    const {suggestions, matchedLang, filterAreaByName} = useContext(AreaContext);

    console.log('suggestions: ', suggestions);
    

    return (
        <div>
            {suggestions && suggestions.map((item) => {
                return(
                    <div onClick={() => filterAreaByName(item.area_name[matchedLang])}>
                        {item.area_name[matchedLang]}
                    </div>
                );
            })
            }
        </div>
    );
}
 
export default Suggestion;
