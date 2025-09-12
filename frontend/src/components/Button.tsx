import { Button as MUIButton } from "@mui/material"
import { ReactNode } from "react"

interface ButtonProps {
    color?: "primary" | "secondary" | "success" | "error" | "info" | "warning",
    fontColor?: string,
    bgColor?: string,
    size?: "large" | "medium" | "small",
    width?: string,
    variant?: "outlined" | "contained" | "text",
    disabled?: boolean,
    borderRadius?: string
    content: string,
    startIcon?: ReactNode, 
    endIcon?: ReactNode,
    onClick?: ()=> void,
    padding?: string
}

export const Button: React.FC<ButtonProps> = ({
    color,
    bgColor, 
    fontColor,
    size = "medium",
    width,
    variant,
    disabled = false,
    borderRadius = "8px",
    content, 
    startIcon,
    endIcon,
    onClick,
    padding
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
                color: fontColor,
                bgcolor: bgColor,
                width: width,
                borderRadius: borderRadius,
                p: padding,
                "&:hover": {
                    opacity: 0.9
                }
            }}
        >
            {content}
        </MUIButton>
    )
}