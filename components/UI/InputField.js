import { TextField } from '@mui/material';

export default function InputField({ label, ...rest }) {
    return (
        <TextField
            label={label}
            fullWidth
            margin="normal"
            {...rest}
        />
    );
}