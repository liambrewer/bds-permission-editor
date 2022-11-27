import { Add, ImportExport } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { UserPermissions } from '../types/bds.types';
import NewEntryDialog from './dialog/NewEntryDialog';

type Props = {
  permissions: UserPermissions[];
  onChange: (permissions: UserPermissions[]) => void;
};

const Editor = ({ permissions, onChange }: Props) => {
  const [newEntryDialogOpen, setNewEntryDialogOpen] = useState(false);

  const toggleNewEntryDialog = () => setNewEntryDialogOpen((v) => !v);

  return (
    <>
      <NewEntryDialog
        open={newEntryDialogOpen}
        onClose={toggleNewEntryDialog}
        onSubmit={(entry) => onChange([...permissions, entry])}
      />
      <Stack spacing={2}>
        <Paper>
          <Stack p={2} direction='row' alignItems='center'>
            <Typography
              sx={{
                flexGrow: 1,
              }}
            >
              {permissions.length} entries
            </Typography>
            <ButtonGroup variant='contained' color='primary'>
              <Button startIcon={<ImportExport />}>Export</Button>
              <Button onClick={toggleNewEntryDialog} startIcon={<Add />}>
                New Entry
              </Button>
            </ButtonGroup>
          </Stack>
        </Paper>
        <List
          sx={{
            overflow: 'auto',
            maxHeight: 'calc(100vh - 200px)',
          }}
        >
          {permissions.map((permission) => (
            <ListItem key={permission.xuid}>
              <ListItemText
                primary={permission.xuid}
                secondary={permission.permission}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
    </>
  );
};

export default Editor;
