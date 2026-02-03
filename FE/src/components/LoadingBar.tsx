import { Box, CircularProgress } from "@mui/material"
import { FC } from "react"

const LoadingBar: FC = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="75vh"
        >
            <CircularProgress size={100} color="primary" />
        </Box>
    )
}

export default LoadingBar;