import { useAuthContext } from '@/context/AuhtContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, IconButton } from '@mui/material';
import Fade from '@mui/material/Fade';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect, useState } from 'react';

export default function Header() {

  const { handleLogOut } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userStorage, setUserStorage] = useState<string>('')
  const open = Boolean(anchorEl);

  const navigate = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/session");
        if (res.ok) {
          const data = await res.json();
          setUserStorage(data.session.nombreUsuario || "Invitado");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSession();
  }, []);


  const handleClick = (event: any) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '10px' }}>
        <h3>{userStorage}</h3>
        <Box>
          <IconButton
            sx={{ float: 'right', fontSize: '5px' }}
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}>

            <AccountCircleIcon sx={{ fontSize: '50px', color: 'white' }} />

          </IconButton>

        </Box>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </div>
    </>
  );
}