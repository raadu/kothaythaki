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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [downPress]);

      useEffect(() => {
        if (suggestions.length && upPress) {
          setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [upPress]);

      useEffect(() => {
        if (suggestions.length && enterPress) {
          setSelected(suggestions[cursor].area_name[matchedLang]);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [cursor, enterPress]);

      useEffect(() => {
        if (suggestions.length && hovered) {
          setCursor(suggestions.indexOf(hovered));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [hovered]);

      useEffect(() => {
        if(selected) {
            filterAreaByName(selected);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [selected]);


    return (
        <div className={SuggestionStyle.suggestionList}>
            {suggestions && suggestions.map((item, i) => {
                return( 
                    <div 
                        onClick={() => setSelected(item.area_name[matchedLang])}
                        className={`${SuggestionStyle.suggestionItem} ${i===cursor ? SuggestionStyle.selected : null}`}
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
