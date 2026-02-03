import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { keyframes } from '@mui/system';

const drawerWidth = 280;
const navItems = [
    { label: 'Home', path: '/home' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blog' },
];

const shimmerAnimation = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

export default function DrawerAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleNavItemClick = (path: string) => {
        navigate(path);
        if (mobileOpen) {
            handleDrawerToggle();
        }
    };

    const isActive = (path: string) => {
        if (path === '/home') {
            return location.pathname === '/' || location.pathname === '/home';
        }
        return location.pathname === path;
    };

    const container = window !== undefined ? () => window.document.body : undefined;

    const drawer = (
        <Box
            sx={{
                height: '100%',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.95) 100%)',
                backdropFilter: 'blur(20px)',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontSize: '1.5rem',
                    }}
                >
                    Seth Fagen
                </Typography>
                <IconButton
                    onClick={handleDrawerToggle}
                    sx={{
                        color: 'text.primary',
                        '&:hover': {
                            background: 'rgba(102, 126, 234, 0.1)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ pt: 2 }}>
                {navItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleNavItemClick(item.path)}
                                sx={{
                                    mx: 1,
                                    borderRadius: '12px',
                                    background: active
                                        ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                                        : 'transparent',
                                    border: active ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    '&:hover': {
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        transform: 'translateX(4px)',
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            fontWeight: active ? 700 : 500,
                                            color: active ? '#667eea' : 'text.primary',
                                            fontSize: '1rem',
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                component="nav"
                position="fixed"
                elevation={0}
                sx={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                }}
            >
                <Toolbar
                    sx={{
                        justifyContent: 'space-between',
                        px: { xs: 2, sm: 3, md: 4 },
                        minHeight: { xs: '56px', sm: '64px' },
                    }}
                >
                    {/* Mobile Menu Button */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { sm: 'none' },
                            color: 'text.primary',
                            background: 'rgba(102, 126, 234, 0.1)',
                            '&:hover': {
                                background: 'rgba(102, 126, 234, 0.2)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo/Brand */}
                    <Typography
                        variant="h6"
                        component="div"
                        onClick={() => navigate('/home')}
                        sx={{
                            flexGrow: { xs: 1, sm: 0 },
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            cursor: 'pointer',
                            fontSize: { xs: '1.2rem', sm: '1.5rem' },
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        Seth Fagen
                    </Typography>

                    {/* Desktop Navigation */}
                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        {navItems.map((item) => {
                            const active = isActive(item.path);
                            return (
                                <Button
                                    key={item.label}
                                    onClick={() => handleNavItemClick(item.path)}
                                    sx={{
                                        color: active ? '#667eea' : 'text.primary',
                                        fontWeight: active ? 700 : 500,
                                        fontSize: '0.95rem',
                                        px: 2,
                                        py: 1,
                                        borderRadius: '10px',
                                        textTransform: 'none',
                                        background: active
                                            ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)'
                                            : 'transparent',
                                        border: active ? '1px solid rgba(102, 126, 234, 0.3)' : '1px solid transparent',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        '&::before': active
                                            ? {
                                                  content: '""',
                                                  position: 'absolute',
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                                  animation: `${shimmerAnimation} 3s ease-in-out infinite`,
                                                  backgroundSize: '200% auto',
                                              }
                                            : {},
                                        '&:hover': {
                                            background: 'rgba(102, 126, 234, 0.1)',
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
                                        },
                                    }}
                                >
                                    {item.label}
                                </Button>
                            );
                        })}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}
