import React, { useEffect, useState, useMemo }  from 'react';

import { StyledEngineProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getPostsAsync, selectPosts, PostI, setCurrentPostId } from './postsSlice';
import { selectUsers } from '../users/usersSlice';

import { searchPosts } from '../../utils/utils';

import PostItem from './PostItem';

const Posts: React.FC = () => {
  
  const dispatch = useAppDispatch();

  const {data: posts, loading} = useAppSelector(selectPosts);
  const users = useAppSelector(selectUsers);

  const [query, setQuery] = useState<string>('');
  const visiblePosts = useMemo(() => searchPosts(posts, users, query), [posts, query, users]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuery(e.target.value);
    if(e.target.value.length > 0) {
      dispatch(setCurrentPostId(null))
    }
  }; 

  useEffect(()=>{
    dispatch(getPostsAsync());
  }, [dispatch]);

  if(loading) {
    return (
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" >
          <CircularProgress />
      </Grid> 
    ); 
  } 
  const postsList = visiblePosts.map((p: PostI, i: number) => {   
      return ( 
          <React.Fragment key={p.id}>
              <PostItem { ...p} ></PostItem>
              {i !== posts.length-1 && <Divider  component="li" />}
          </React.Fragment>
      )
  });

  return (
    <StyledEngineProvider injectFirst>
        <Card>
            <Typography gutterBottom variant="h4" component="div">
              Posts
            </Typography>
            <TextField fullWidth id="search-posts" label="Search posts" variant="standard" value={query} onChange={handleChange} />
            <List>
                {postsList.length >0 ? postsList: <div>No posts found</div>}
            </List>
        </Card>
    </StyledEngineProvider>
  );
}

export default Posts;
