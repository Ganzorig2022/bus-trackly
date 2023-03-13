import { useCollection } from '@/hooks/useCollection';
import { checkEmptyInputs } from '@/utils/checkEmptyInputs';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { ChangeEvent, useState } from 'react';

const AddDriver = ({ isOpen, setIsOpen }: { isOpen: any; setIsOpen: any }) => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const { createDriverData } = useCollection('Drivers');

  const onInputFieldHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onSaveHandler = async () => {
    const isEmpty = checkEmptyInputs(Object.values(values));

    if (isEmpty) {
      alert('Empty fields');
      return;
    }

    await createDriverData({
      ...values,
      role: 'USER',
      active: false,
      location: { latitude: 0, longitude: 0 },
    });
    alert('Амжилттай хадгаллаа'), setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={[
          style,
          {
            display: 'flex',
            flexDirection: 'column',
            color: '#000',
            height: 500,
          },
        ]}
      >
        <Box flex={1} alignItems='center'>
          <Typography fontWeight='700' fontSize={20}>
            Жолооч бүртгэх
          </Typography>
        </Box>
        <Box
          component='form'
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          noValidate
          autoComplete='off'
        >
          <Stack spacing={2}>
            <TextField
              error={false}
              label='Овог'
              placeholder='asda'
              name='lastName'
              value={values.lastName}
              fullWidth
              required
              onChange={onInputFieldHandler}
            />
            <TextField
              error={false}
              label='Нэр'
              fullWidth
              required
              name='firstName'
              value={values.firstName}
              onChange={onInputFieldHandler}
            />
            <TextField
              error={false}
              label='Утас'
              fullWidth
              required
              name='phone'
              value={values.phone}
              onChange={onInputFieldHandler}
            />
            <TextField
              error={false}
              label='И-мэйл'
              fullWidth
              required
              name='email'
              value={values.email}
              onChange={onInputFieldHandler}
            />
          </Stack>
        </Box>
        <Box
          flex={1}
          display='flex'
          justifyContent='space-between'
          alignItems='center'
        >
          <Button
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              width: '40%',
              height: 40,
              ':hover': {
                bgcolor: '#fff', // theme.palette.primary.main
                color: '#000',
                border: '1px solid',
              },
            }}
            onClick={onSaveHandler}
          >
             Хадгалах
          </Button>
          <Button
            sx={{
              border: '1px solid',
              borderColor: '#000',
              color: '#000',
              width: '40%',
              height: 40,
              ':hover': {
                bgcolor: '#000', // theme.palette.primary.main
                color: 'white',
              },
            }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Хаах
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default AddDriver;

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 5,
  borderRadius: 5,
};
