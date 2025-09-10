import { Button as MUIButton } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning"
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
    color = 'info',
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
            color={color}
            variant={variant}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={{
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