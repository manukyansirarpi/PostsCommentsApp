import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import styles from './Relplies.module.css';
import { ReplyI } from './replysSlice';

interface ReplyItemProps extends ReplyI{
    deleteHandler: (id: number) => void
}

const ReplyItem: React.FC<ReplyItemProps> = ({id, text, name, deleteHandler}) => {

    return (    
        <ListItem key={`comment-repl-${id}`} className={styles.commentReplyWrapper} >
            <ListItemText className={styles.replyItem} primary={name} secondary={text} />
            <ListItemButton onClick={() => deleteHandler(id)} className={styles.deleteReplyBtn}>
                x
            </ListItemButton>
        </ListItem>
    );
}

export default ReplyItem;
