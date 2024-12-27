import { Typography as MuiTypography } from '@mui/material';

export default function Typography({ variant, children, ...rest }) {
    return <MuiTypography variant={variant} {...rest}>{children}</MuiTypography>;
}