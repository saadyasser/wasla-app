import { Button as MUIButton } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning",
    bgColor?: string,
    size: "large" | "medium" | "small",
    variant: "outlined" | "contained" | "text",
    disabled: boolean,
    borderRadius: string
    content: string,
    startIcon?: ReactNode, 
    endIcon?: ReactNode,
    onClick?: ()=> void
}

export const Button: React.FC<ButtonProps> = ({
    color, 
    bgColor, 
    size = "medium",
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
            color={color}
            size={size}
            variant={variant}
            disabled={disabled}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            sx={{
                bgcolor: {bgColor},
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