import React, { useState } from 'react'
import { Button, TextField, Grid, Typography, Container } from '@mui/material'
import PasswordMeterInput from './Password'
import { useAddUserMutation } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const Signup: React.FC = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [addUser, { isLoading }] = useAddUserMutation()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await addUser({ username, email, password })
      navigate('/login')
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
            <Typography variant="h4">Register</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              value={username}
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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

export default Signup