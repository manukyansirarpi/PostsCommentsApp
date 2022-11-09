import React, { useEffect } from 'react';

import { useAppDispatch } from './app/hooks';
import { getUsersAsync } from './components/users/usersSlice';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Posts from './components/posts/Posts';
import Comments from './components/comments/Comments';
import Header from './components/header/header';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header></Header>
      <Container>
        <Grid container spacing={2}>
          <Grid xs={5}>
            <Posts/>
          </Grid>
          <Grid xs={7}>
            <Comments/>
          </Grid>
      </Grid>
    </Container>
    </React.Fragment>
  );
}

export default App;
