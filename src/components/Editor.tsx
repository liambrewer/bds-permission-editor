import { Add, Delete, Edit, ImportExport, MoreVert } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { FixedSizeList } from 'react-window';
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from 'material-ui-popup-state/hooks';
import { UserPermissions } from '../types/bds.types';
import NewEntryDialog from './dialog/NewEntryDialog';
import { minWidth } from '@mui/system';
import { useConfirm } from 'material-ui-confirm';

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
              {`${permissions.length} ${
                permissions.length === 1 ? 'entry' : 'entries'
              }`}
            </Typography>
            <ButtonGroup variant='contained' color='primary'>
              <Button startIcon={<ImportExport />}>Export</Button>
              <Button onClick={toggleNewEntryDialog} startIcon={<Add />}>
                New Entry
              </Button>
            </ButtonGroup>
          </Stack>
        </Paper>
        <Paper
          sx={{
            width: '100%',
            p: 2,
          }}
        >
          <FixedSizeList
            height={400}
            width='100%'
            itemSize={52}
            itemCount={permissions.length}
          >
            {({ index, style }) => {
              const popupState = usePopupState({
                variant: 'popover',
                popupId: `entry${index}`,
              });

              const confirm = useConfirm();

              const permission = permissions[index];

              const deleteEntry = () => {
                confirm({
                  title: 'Are you sure?',
                  description: `Are you sure you want to delete the entry for ${permission.xuid}?`,
                  confirmationText: 'Delete',
                  confirmationButtonProps: {
                    startIcon: <Delete />,
                    color: 'error',
                  },
                }).then(() => {
                  const newPermissions = [...permissions];
                  newPermissions.splice(index, 1);
                  onChange(newPermissions);
                });
              };

              return (
                <ListItem
                  key={permission.xuid}
                  style={style}
                  component='div'
                  disablePadding
                  secondaryAction={
                    <>
                      <IconButton {...bindTrigger(popupState)}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorOrigin={{
                          horizontal: 'left',
                          vertical: 'top',
                        }}
                        {...bindMenu(popupState)}
                      >
                        <MenuItem onClick={popupState.close}>
                          <ListItemIcon>
                            <Edit fontSize='small' />
                          </ListItemIcon>
                          <Typography>Edit</Typography>
                        </MenuItem>
                        <MenuItem onClick={deleteEntry}>
                          <ListItemIcon>
                            <Delete color='error' fontSize='small' />
                          </ListItemIcon>
                          <Typography color='error'>Delete</Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  }
                >
                  <ListItemText
                    primary={permission.xuid}
                    secondary={permission.permission}
                  />
                </ListItem>
              );
            }}
          </FixedSizeList>
        </Paper>
      </Stack>
    </>
  );
};

export default Editor;
