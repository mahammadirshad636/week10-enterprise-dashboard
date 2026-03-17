import { TextField, type TextFieldProps } from '@mui/material';

export type InputProps = TextFieldProps;

export const Input = (props: InputProps) => <TextField size="small" fullWidth {...props} />;
