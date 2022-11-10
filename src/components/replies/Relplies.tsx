import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import Input from '@mui/material/Input';

import { replyToComment, deleteReply, selectReplies } from './replysSlice';
import { selectCurrentUser } from '../users/usersSlice';
import ReplyItem from './ReplyItem';

const Replies: React.FC<{commentId: number}> = ({commentId}) => {

    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(selectCurrentUser);
    const replies = useAppSelector(selectReplies);
    const id = Math.floor(1000 * Math.random());

    const deleteHandler = (id: number) => {
        dispatch(deleteReply({id, commentId}));
    };

    const onAddReply = (e: any) => {
        if (e.key === 'Enter' && e.target.value && e.target.value.trim().length > 0) {
            dispatch(replyToComment(
                [{id,  commentId,  name: currentUser.name, text: e.target.value  }])
            );
            e.target.value = '';
        }
    }

    return ( 
        <React.Fragment>
            {replies && replies[commentId] && replies[commentId].map(r => <ReplyItem deleteHandler={deleteHandler} key={r.id} {...r}></ReplyItem>)  }
            <Input placeholder="Reply" fullWidth={true} onKeyDown={(event) => onAddReply(event)} />
        </React.Fragment>
    );
}

export default Replies;
