import React, { useEffect, useState } from 'react'
import { Container, Grid2, Typography, CircularProgress, Card, CardContent, CardHeader } from '@mui/material'

const FetchUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const USER_API = 'https://jsonplaceholder.typicode.com/users';

    useEffect(() => {
        fetch(USER_API)
        .then((response) => {
            if(!response.ok) {
                throw new Error('Network Error')
            }
            return response.json();
        })
        .then((data) => {
            setUsers(data);
            setLoading(false);
        })
        .catch(() => {
            setError(true);
            setLoading(false);
        });
    }, []);

    if(loading)
        return (
            <Container sx={{ textAlign: 'center', mt: 2}}>
                <CircularProgress />
                <Typography variant='h6' sx={{ mt: 2}}>
                    Loading users...
                </Typography>
            </Container>
        );
    
        if(error)
            return(
            <Container  sx={{ mt: 5}}>
                <Alert severity='error'>Error loading users</Alert>
            </Container>
        );

  return (
    <Container sx={{ mt: 5}}>
        <Typography variant='h4' gutterBottom>User List</Typography>
        <Grid2 container spacing={3}>
            {users.map((user) => (
                <Grid2 key={user.id}>
                    <Card>
                        <CardHeader title={user.name} subheader={user.username} />
                        <CardContent>
                            <Typography variant='body2' color='textSecondary'> Email: {user.email}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant='body2' color='textSecondary'> Phone: {user.phone}</Typography>
                        </CardContent>
                        <CardContent>
                            <Typography variant='body2' color='textSecondary'> Website: {user.website}</Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    </Container>
  )
}

export default FetchUser;