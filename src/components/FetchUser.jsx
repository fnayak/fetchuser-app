import React, { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Alert, Paper, List, ListItem, ListItemText } from '@mui/material'

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
            <Box display={'flex'} justifyContent={'center'} mt={5}>
                <CircularProgress />
            </Box>
        );
    
        if(error)
            return(
            <Box width={'400px'} margin={'50px auto'}>
                <Alert severity='error'>Error loading users</Alert>
            </Box>
        );

  return (
    <Box width={'600px'} margin={'50px auto'} padding={'20px'} component={Paper} elevation={3}>
        <Typography variant='h5' gutterBottom>User List</Typography>
        <List>
            {users.map((user) => (
                <ListItem key={user.id} divider>
                    <ListItemText primary={user.name} secondary={user.email} />
                </ListItem>
            ))}
        </List>
    </Box>
  )
}

export default FetchUser;