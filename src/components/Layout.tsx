import { GitHub } from '@mui/icons-material';
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Tooltip,
} from '@mui/material';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            BDS Permission Editor
          </Typography>
          <Tooltip title='View project on GitHub' placement='left' arrow>
            <IconButton
              color='inherit'
              component='a'
              href='https://github.com/stevharve/bds-permission-editor'
              target='_blank'
              rel='noreferrer'
              style={{
                textDecoration: 'none',
              }}
            >
              <GitHub fontSize='large' />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 2 }}>{children}</Container>
    </>
  );
};

export default Layout;
