import React, { useCallback, useState } from 'react';
import { compile } from 'core/js/reactHelpers';
export default function CourseNotes(props) {

  const localStorageKey = 'adaptCourseNotes';
  const { displayTitle, instruction, placeholder } = props;

  const storage = localStorage.getItem(localStorageKey) || '';
  const [valueTextArea, setValueTextArea] = useState(storage);
  const [isSaved, setIsSaved] = useState(true);
  const [wasChanged, setWasChanged] = useState(false);
  const saveNotes = useCallback(
    _.debounce(valueTextArea => {
      localStorage.setItem(localStorageKey, valueTextArea);
      setIsSaved(true);
    }, 1000),
    []
  );

  const handleChange = (event) => {
    setWasChanged(true);
    setIsSaved(false);
    setValueTextArea(event.target.value);
    saveNotes(event.target.value);
  };

  return (
    <div className="coursenotes__header">
      {displayTitle &&
      <div className='coursenotes__title'>
        <div className='coursenotes__title-inner' dangerouslySetInnerHTML={{ __html: compile(displayTitle, props) }}>
        </div>
      </div>
      }

      {instruction &&
        <div className='coursenotes__instruction'>
          <div className='coursenotes__instruction-inner' dangerouslySetInnerHTML={{ __html: compile(instruction, props) }}>
          </div>
        </div>
      }
      <div className="coursenotes__widget">
        {wasChanged && <div className={`coursenotes__status icon ${isSaved ? 'icon-tick' : 'icon-ellipsis'}`}></div>}
        <textarea
          placeholder={placeholder}
          value={valueTextArea}
          onChange={handleChange}
        ></textarea>
      </div>
    </div>
  );
}
