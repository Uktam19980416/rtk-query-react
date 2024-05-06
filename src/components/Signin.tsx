import React, { useState } from 'react'
import { Button, TextField, Grid, Typography, Container } from '@mui/material'
import PasswordMeterInput from './Password'
import { useGetUsersQuery, useLoginMutation } from '../api/userApi'
import { useNavigate, Link } from 'react-router-dom'

const Signin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading }] = useLoginMutation()
  const { data: usersData } = useGetUsersQuery()
  const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const user = usersData?.find(
        (user) => user.email === email && user.password === password
      )
      console.log(user, login)
      if (user) {
        navigate('/books')
      } else {
        alert('Invalid email or password')
      }
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h4">Login</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <PasswordMeterInput password={password} setPassword={setPassword} />
          </Grid>
          <Button component={Link} to="/signup" variant="text">
            You have no login?
          </Button>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
            >
              Sign up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Signin
