import React from 'react';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Replies from '../replies/Relplies';
import Tags from '../tags/Tags';
import { capitalize } from '../../utils/utils';
import { CommentI } from './commentsSlice';
import styles from './Comments.module.css';

const CommentItem: React.FC<CommentI>  = (props) => {
    const {id, name, body, email} = props;
    return (
        <Card variant="outlined" key={id} className={styles.commentItemWrapper}>
            <CardContent>
                <ListItem key={id}>
                    <ListItemText
                        primary={
                            <React.Fragment>
                                <Typography component={'span'} className={styles.authorTitle}>
                                    {email}
                                </Typography>
                                {capitalize(name)}
                             </React.Fragment>
                        }
                        secondary={capitalize(body)}
                    />
                </ListItem>
                <Replies commentId={id}></Replies>
            </CardContent>
            <CardActions>        
                <Tags comment={props}></Tags>
            </CardActions>
        </Card>
    ); 
}

export default CommentItem;