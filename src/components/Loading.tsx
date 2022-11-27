import { CircularProgress, Stack, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Stack direction='row' spacing={2} justifyContent='center'>
      <CircularProgress />
      <Typography variant='h5'>Parsing JSON...</Typography>
    </Stack>
  );
};

export default Loading;
