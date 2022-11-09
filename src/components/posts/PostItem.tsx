import React,  {useMemo} from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUsers } from '../users/usersSlice';
import { setCurrentPostId, selectCurrentPost, PostI } from './postsSlice';
import { capitalize, getUserById} from '../../utils/utils';
import styles from './Posts.module.css';

const PostItem: React.FC<PostI> = ({id, title, body, userId}) => {

    const dispatch = useAppDispatch();
    const users = useAppSelector(selectUsers);
    const currentPost = useAppSelector(selectCurrentPost);

    const handleClick = () => {
        dispatch(setCurrentPostId(id))
    };

    const user = useMemo(() => getUserById(users, userId), [users, userId]);
    
    return (
        <ListItem key={id} className={[styles.postItem, currentPost === id? styles.current: ''].join(' ')} onClick= {handleClick}>
            <ListItemText
                primary={
                    <Typography component={'span'}  className={styles.postTitle} >
                        {capitalize(title) }
                    </Typography>
                }
                secondary={
                    <React.Fragment>
                        {capitalize(body)}
                        <Typography component={'span'}  className={styles.authorTitle}  >
                            { user && user.name }
                        </Typography>
                    </React.Fragment>
                }
                />
        </ListItem>
    );
}

export default PostItem;
