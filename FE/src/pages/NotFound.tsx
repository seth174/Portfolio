import { useNavigate } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <Container style={{ textAlign: 'center', marginTop: '20%' }}>
            <Typography variant="h4" gutterBottom>
                404 - Page Not Found
            </Typography>
            <Typography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={goHome}>
                Return to Home
            </Button>
        </Container>
    );
};

export default NotFound;
