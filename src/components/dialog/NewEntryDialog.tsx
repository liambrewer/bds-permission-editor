import { Add, OpenInNew } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { PermissionLevel, UserPermissions, XUID } from '../../types/bds.types';
import * as Yup from 'yup';

type InitialValues = {
  permission: PermissionLevel | null;
  xuid: XUID;
};

const validationSchema = Yup.object().shape({
  permission: Yup.mixed<PermissionLevel | null>()
    .oneOf([
      PermissionLevel.OPERATOR,
      PermissionLevel.MEMBER,
      PermissionLevel.VISITOR,
      null,
    ])
    .required('Required'),
  xuid: Yup.string()
    .required('Required')
    .length(16, 'XUID must be 16 characters long'),
});

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (entry: UserPermissions) => void;
};

const NewEntryDialog = ({ open, onClose, onSubmit }: Props) => {
  const initialValues: InitialValues = {
    permission: null,
    xuid: '',
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Add a new entry to <code>permissions.json</code>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          onSubmit({
            permission: values.permission!,
            xuid: values.xuid,
          });
          onClose();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <DialogContent>
              <DialogContentText>
                Select the permission level and enter the XUID of the user. If
                you don't know the XUID of the user, you can find it by using
                this{' '}
                <Link
                  href='https://cxkes.me/xbox/xuid'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  awesome tool
                  <OpenInNew fontSize='inherit' />
                </Link>
                .
              </DialogContentText>
              <Stack spacing={1} mt={1}>
                <FormControl fullWidth variant='standard' required>
                  <InputLabel>Permission Level</InputLabel>
                  <Select
                    id='permission'
                    name='permission'
                    value={values.permission}
                    disabled={isSubmitting}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    label='Permission Level'
                    error={touched.permission && Boolean(errors.permission)}
                    required
                  >
                    {Object.entries(PermissionLevel).map(([key, value]) => (
                      <MenuItem key={key} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.permission && touched.permission && (
                    <FormHelperText error>{errors.permission}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  id='xuid'
                  name='xuid'
                  variant='standard'
                  fullWidth
                  label='XUID'
                  placeholder='16 digit XUID'
                  value={values.xuid}
                  disabled={isSubmitting}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.xuid && Boolean(errors.xuid)}
                  helperText={errors.xuid && touched.xuid && errors.xuid}
                  required
                />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} color='error'>
                Cancel
              </Button>
              <Button
                variant='contained'
                startIcon={<Add />}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add
              </Button>
            </DialogActions>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default NewEntryDialog;
