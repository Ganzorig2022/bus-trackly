// import libraries
import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import local files
import imgBack from '../assets/mapbackground.png';
import bus from '../assets/Bus.png';
import pushpin from '../assets/Round Pushpin.png';
import wave from '../assets/Wave.png';
import classes from '../styles/Home.module.css';
import axios from 'axios';
import { auth } from '@/firebase/config';
import { useAuth } from '@/hooks/useAuth';

//Rendering
const Login = () => {
  const router = useRouter();
  const { signIn, loading } = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: '',
    role: '',
  });

  const onSelectHandler = (event: SelectChangeEvent) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onTextFieldHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onUserSave = async () => {
    if (values.email === '' && values.password === '') {
      alert('Please provide email and password');
    } else {
      await signIn(values.email, values.password);
      setValues({ email: '', password: '', role: '' });
    }

    // if (values.email !== '') {
    //   try {
    //     const result = await axios.post('/api/user', {
    //       ...values,
    //     });
    //     console.log(result);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  // console.log(values);

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          backgroundColor: '#fff',
          color: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            gap: 3,
          }}
        >
          <Typography>Тавтай морил!</Typography>
          <TextField
            id='outlined-basic'
            variant='outlined'
            size='small'
            placeholder='И-мэйл'
            name='email'
            value={values.email}
            onChange={onTextFieldHandler}
          />
          <TextField
            id='outlined-basic'
            variant='outlined'
            size='small'
            placeholder='Нууц үг'
            name='password'
            value={values.password}
            onChange={onTextFieldHandler}
          />
          <Select
            label='Role'
            onChange={onSelectHandler}
            value={values.role}
            name='role'
          >
            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
            <MenuItem value={'USER'}>USER</MenuItem>
          </Select>
          <Button
            sx={{ backgroundColor: '#000', color: '#fff' }}
            variant='contained'
            onClick={onUserSave}
          >
            НЭВТРЭХ
          </Button>
        </Box>
      </Box>
      <Box
        flex={1}
        sx={{
          position: 'relative',
          display: { xs: 'none', sm: 'flex' },
          backgroundColor: '#ffffff10',
        }}
      >
        <Image
          src={imgBack}
          alt='Picture of the author'
          className={classes.image}
        />
        <Box
          sx={{ display: 'flex', position: 'absolute', top: 250, left: 200 }}
        >
          <Image src={wave} width={50} height={50} alt='bus' />
          <Image src={bus} width={50} height={50} alt='bus' />
          <Image src={pushpin} width={50} height={50} alt='bus' />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            width: 400,
            alignItems: 'flex-end',
            bottom: 50,
            right: 50,
          }}
        >
          <Typography sx={{ fontSize: 50, fontStyle: 'italic' }}>
            Хязгааргүйн
          </Typography>
          <Typography sx={{ fontSize: 15 }}>уудам руу</Typography>
          <Typography sx={{ fontSize: 50, fontStyle: 'italic' }}>
            Хамтдаа
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
