import { Button as MUIButton } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
    color?: string,
    bgColor?: string,
    size?: "large" | "medium" | "small",
    width?: string,
    variant: "outlined" | "contained" | "text",
    disabled?: boolean,
    borderRadius?: string
    content: string,
    startIcon?: ReactNode, 
    endIcon?: ReactNode,
    onClick?: ()=> void
}

export const Button: React.FC<ButtonProps> = ({
    color, 
    bgColor, 
    size = "medium",
    width,
    variant = "contained",
    disabled = false,
    borderRadius = "8px",
    content, 
    startIcon,
    endIcon,
    onClick
})=>{
    return(
        <MUIButton 
            size={size}
            variant={variant}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={{
                color: {color},
                bgcolor: {bgColor},
                width: {width},
                borderRadius: {borderRadius},
                "&:hover": {
                    opacity: 0.9
                }
            }}
        >
            {content}
        </MUIButton>
    )
}