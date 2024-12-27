import { Button as MuiButton } from '@mui/material';

export default function Button({ children, ...rest }) {
    return <MuiButton {...rest}>{children}</MuiButton>;
}