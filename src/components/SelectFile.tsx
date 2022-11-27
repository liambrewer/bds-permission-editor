import { UploadFile } from '@mui/icons-material';
import { Button, Stack, Typography } from '@mui/material';

type Props = {
  onFileSelected: (file: File) => void;
};

const SelectFile = ({ onFileSelected }: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant='body1'>
        Select a <code>permissions.json</code> file to edit. This file will not
        be uploaded to a server and will be parsed locally.
      </Typography>
      <Button variant='contained' component='label' startIcon={<UploadFile />}>
        Select permissions.json
        <input
          type='file'
          hidden
          accept={'.json'}
          max={1}
          onChange={(e) => {
            if (e.target.files) {
              onFileSelected(e.target.files[0]);
            }
          }}
        />
      </Button>
    </Stack>
  );
};

export default SelectFile;
