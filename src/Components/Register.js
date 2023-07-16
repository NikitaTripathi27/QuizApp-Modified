import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { register } from '../routes/auth.routes';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/material/Button';
import Typography from '@mui/joy/Typography';
import './Register.css';

const Register = (props) => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFormChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setForm((prev) => { return { ...prev, [key]: value } });
  }
  const setLocalStorageData = (data) => {
    localStorage.setItem('username', data?.user?.username);
    localStorage.setItem('email', data?.user?.email);
    localStorage.setItem('accessToken', data?.tokens?.access?.token);
  }

  const handleRegister = async () => {
    setIsLoading(true);

    try {
      const { username, email, password, confirmPassword } = form;
      if (password !== confirmPassword) {
        throw new Error("Password must be same!");
      }
      const data = await register({ username, email, password });
      setLocalStorageData(data);
      navigate('/login');
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClickLogin=() => {
    navigate('/login')
  }

  return (
    <Box
      className="register-layout"
    >
      <Paper
        className="register-form"
      >
        <Stack
          spacing={2}
        >
          <Typography level="h3">Sign Up</Typography>

          <FormControl>
            <Input
              name="username"
              placeholder='Username'
              value={form.username}
              onChange={handleFormChange}
            />
            <FormHelperText>Please Enter username with min length 5</FormHelperText>
          </FormControl>

          <FormControl>
            <Input
              type="email"
              name="email"
              placeholder='Email'
              value={form.email}
              onChange={handleFormChange}
            />
            <FormHelperText>Email must be lower case!</FormHelperText>
          </FormControl>

          <FormControl>
            <Input
              type='password'
              name="password"
              placeholder='Password'
              value={form.password}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl>
            <Input
              type='password'
              name="confirmPassword"
              placeholder='Confirm Password'
              value={form.confirmPassword}
              onChange={handleFormChange}
            />
          </FormControl>

          <FormControl>
            <Button
              variant="contained"
              onClick={handleRegister}
            >
              {isLoading ? <CircularProgress size='1.5rem' color='inherit' /> : "Register"}
            </Button>
          </FormControl>
        </Stack>
      </Paper>
      <div className='sub-register'>
      <span >Already have an account ? </span><span onClick={handleClickLogin} className="login-click">Login Here</span>
    </div>
    </Box>
  );
}

export default Register;