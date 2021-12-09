import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { ErrorMessage, FieldArray, useField } from 'formik';
import { BiShow } from "react-icons/bi";


function TextInput(props) {
    const [field, meta] = useField(props)
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div >
            <TextField
                sx={{ width: { xs: '80%', sm: '50%', md: '60%', lg: '50%' } }}
                {...field}
                error={meta.touched && meta.error ? true : false}
                label={props.label}
                type={props.type}
                type={!showPassword && props.InputProps ? "password" : "text"}
                InputProps={props.InputProps ? {
                    endAdornment: (
                        <Box sx={{ position: 'absolute', right: '10px', lineHeight: '10px', color: 'rgba(0, 0, 0, 0.6)', cursor: 'pointer' }}>
                            <BiShow onClick={() => {
                                setShowPassword(!showPassword)
                            }} />
                        </Box>
                    )
                }
                    : null}
            />

            <Box sx={{ position: 'absolute',left: {xs: '12%', sm:'26%', md: '22%', lg: '26%'}, display: 'block', fontSize: '10px', color: 'red', marginBottom: '15px' }}>
                <ErrorMessage name={field.name}></ErrorMessage>
            </Box>
        </div>
    );
}

export default TextInput;
