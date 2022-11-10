import React, { useMemo, useState} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { addTag, selectTags } from './tagsSlice';
import { getCommentsTags, searchtags } from '../../utils/utils';

import classes from "./Tags.module.css"
import { addTagToComment, CommentI, deleteTagFromComment } from '../comments/commentsSlice';


const Tags: React.FC<{comment: CommentI}> = ({comment}) => {

   const dispatch = useAppDispatch();
   const tags = useAppSelector(selectTags);
   const [query, setQuery] = useState<string>('');
   const [typing, setTyping] = useState(false);
   const [mouseIsOnSuggestions, setMouseOnSuggestions] = useState(false);

   const visibleTags = useMemo(() => getCommentsTags(tags, comment), [tags, comment]);
   const suggestedTags = useMemo(() => searchtags(tags, query), [tags, query]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  }; 

   const onTagAdded = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!(e.target instanceof HTMLInputElement)) {
            return;
        }
        const tagId = Math.floor(1000 * Math.random());
        if (e.key === 'Enter' && e.target.value && e.target.value.trim().length > 0) {
            dispatch(addTag({id: tagId, text: e.target.value}));
            dispatch(addTagToComment({tagId, comment}));
            setQuery('');
      }
  }

  const onTagRemoved = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (!(e.target instanceof HTMLSpanElement)) {
        return;
    }
    if(e.target.dataset.id) {
        const tagId = parseInt(e.target.dataset.id);
        dispatch(deleteTagFromComment({tagId, comment}));
    }
  }

  const onSuggestionAddedToComment = (tagId: number) => {
    dispatch(addTagToComment({tagId, comment}));
    setQuery('');
    setTyping(false);
    setMouseOnSuggestions(false);
  }

   return (
        <div className= {classes.tagContainer}>
            <div className= {classes.tagItems}>
                {
                    visibleTags && visibleTags.map(t=> <div key={t.id} className={classes.tag}>
                        {t.text}
                        <span className= {classes.deleteTag} onClick={onTagRemoved} data-id={t.id}>x</span>
                    </div>) 
                }
            </div>
            <div>
            <input type="text" placeholder='add tags .. ' value={query} className={classes.tagInput} onKeyDown={onTagAdded} onChange={handleChange}
                onFocus={() => setTyping(true)} onBlur={() => setTyping(false)}/>
            </div>
            { ((typing && query.length > 2) || mouseIsOnSuggestions) && <ul className={classes.suggestions} onMouseOver={(e) => setMouseOnSuggestions(true)}>
                {suggestedTags.map((suggestion, index) => 
                    <li key={suggestion.id} onClick={() => onSuggestionAddedToComment(suggestion.id)}>
                       {suggestion.text}
                    </li>
                )}
            </ul>
            }
        </div>
   );
}

export default Tags;