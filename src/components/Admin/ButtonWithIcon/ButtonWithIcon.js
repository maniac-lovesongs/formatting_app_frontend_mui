import React from 'react';
import { Button} from "@mui/material";

const ButtonWithIcon = (Icon, sx) => {
    return (props) => {
        return(
            <Button 
                {...props}
                sx={sx}
                variant="contained" 
                startIcon={<Icon />}>
                {props.inner}
            </Button>
        );

    };
}

export default ButtonWithIcon;