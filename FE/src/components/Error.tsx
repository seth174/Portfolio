import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <Container style={{ textAlign: 'center', marginTop: '20%' }}>
            <Typography variant="h4" gutterBottom>
                Something went wrong
            </Typography>
            <Typography variant="body1" gutterBottom>
                There was a failure loading page. Please  try again
            </Typography>
            <Button variant="contained" color="primary" onClick={goHome}>
                Return to Home
            </Button>
        </Container>
    );
};

export default Error;