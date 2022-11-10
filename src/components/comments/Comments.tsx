import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { StyledEngineProvider } from '@mui/material/styles';
import { List } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { selectComments, CommentI, getCommentsAsync } from './commentsSlice';
import { selectCurrentPost } from '../posts/postsSlice';
import CommentItem from './CommentItem';

const Comments: React.FC = () => {

  const dispatch = useAppDispatch();
  const {data: comments, loading }= useAppSelector(selectComments);
  const currentPost = useAppSelector(selectCurrentPost);

  useEffect(()=>{
    if(currentPost) {
        dispatch(getCommentsAsync(currentPost));
    }   
  }, [currentPost, dispatch]);

    if(loading ) {
        return (
            <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" >
                <CircularProgress />
            </Grid> 
        );
    } else if (currentPost && comments[currentPost]?.length > 0) {
        return (
            <StyledEngineProvider injectFirst>
                <Typography gutterBottom variant="h5" component="div">
                    Comments
                </Typography>
                <List>
                { 
                    comments[currentPost].map((c: CommentI) => <CommentItem key={c.id} {...c} ></CommentItem> ) 
                }
                </List>
            </StyledEngineProvider>
        ); 
    }  else { 
        return (
            <div>Please select post to see comments </div>
        );
    }
}

export default Comments;
