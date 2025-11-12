import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Avatar, Menu, MenuItem, Tooltip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Appbar = () => {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);
	const handleOpen = (e) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<AppBar position="sticky" elevation={0}>
			<Toolbar sx={{ gap: 2 }}>
				<IconButton size="large" edge="start" color="inherit" sx={{ mr: 1 }}>
					<MenuIcon />
				</IconButton>
				<Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '.2px' }}>
					GameScore
				</Typography>
				<Box sx={{ flex: 1 }} />
				<Tooltip title="Pesquisar">
					<IconButton color="inherit">
						<SearchIcon />
					</IconButton>
				</Tooltip>
				<Tooltip title="Conta">
					<IconButton onClick={handleOpen} size="small" sx={{ ml: 1 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
						<Avatar sx={{ width: 32, height: 32 }}>U</Avatar>
					</IconButton>
				</Tooltip>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<MenuItem onClick={() => (window.location.href = '/profile')}>Perfil</MenuItem>
					<MenuItem onClick={() => {
						logout();
						navigate('/login');
					}}>Sair</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

export default Appbar;
