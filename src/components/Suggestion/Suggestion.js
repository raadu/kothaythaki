import { useEffect, useState, useContext } from 'react';
import SuggestionStyle from './Suggestion.module.scss';
import { AreaContext } from '../../contexts/AreaContext';
import uuid from 'react-uuid';

const useKeyPress = function (targetKey, ref) {
    const [keyPressed, setKeyPressed] = useState(false);


    function downHandler({ key }) {
        if (key === targetKey) {
            setKeyPressed(true);
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", downHandler);
        window.addEventListener("keyup", upHandler);

        return () => {
            window.removeEventListener("keydown", downHandler);
            window.removeEventListener("keyup", upHandler);
        };
    });

    return keyPressed;
};

const Suggestion = () => {
    // Contexts
    const {suggestions, matchedLang, filterAreaByName} = useContext(AreaContext);

    // States
    const [selected, setSelected] = useState(undefined);
    const [cursor, setCursor] = useState(0);
    const [hovered, setHovered] = useState(undefined);

    // Variables
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");

    useEffect(() => {
        if (suggestions.length && downPress) {
          setCursor(prevState =>
            prevState < suggestions.length - 1 ? prevState + 1 : prevState
          );
        }
      }, [downPress]);
      useEffect(() => {
        if (suggestions.length && upPress) {
          setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
      }, [upPress]);
      useEffect(() => {
        if (suggestions.length && enterPress) {
            // console.log('suggestions[cursor] in ooo: ', suggestions[cursor].area_name[matchedLang]);
            
          setSelected(suggestions[cursor].area_name[matchedLang]);
        }
      }, [cursor, enterPress]);
      useEffect(() => {
        if (suggestions.length && hovered) {
          setCursor(suggestions.indexOf(hovered));
        }
      }, [hovered]);


      useEffect(() => {
        if(selected) {
            filterAreaByName(selected);
        }
      }, [selected]);


    return (
        <div>
            {suggestions && suggestions.map((item, i) => {
                return( 
                    <div 
                        onClick={() => setSelected(item.area_name[matchedLang])}
                        className={i===cursor ? SuggestionStyle.suggestionItem_selected : SuggestionStyle.suggestionItem}
                        key={uuid()}
                        onMouseEnter={() => setHovered(item)}
                        onMouseLeave={() => setHovered(undefined)}
                    >
                        {item.area_name[matchedLang]}
                    </div>
                );
            })
            }
        </div>
    );
}
 
export default Suggestion;
