import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

// const MENU_OPTIONS = [
//   {
//     label: 'خانه',
//     icon: 'eva:home-fill',
//   },
//   {
//     label: 'پروفایل',
//     icon: 'eva:person-fill',
//   },
//   {
//     label: 'تنظیمات',
//     icon: 'eva:settings-2-fill',
//   },

// ];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [open, setOpen] = useState(false);
  const [nav, setNav] = useState(false)
  const [data,setData] = useState()

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleExit = () => {
    localStorage.removeItem("userInfo") 
    localStorage.removeItem("userRole")
    setNav(true)
    setOpen(null);
  };

  const handleReload = () => {

  }
  useEffect(() => {
    const GetData = async () => {
      const username = localStorage.getItem("userInfo")
      // eslint-disable-next-line
      await axios.get(`${host}/api/karbrans?filters\[username]=${username}&populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data[0])
        
      })
    }
    GetData()
  },[host,token])

  return (
    <>{nav ? <Navigate to="/login" replace={true} /> : <>
      {data && <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      > 
      {data.attributes.profileImage.data.attributes.formats.small.url === "/uploads/small_ef6e37e7_fbbe_44d4_8b55_1de7145a4dd6_3e10624233.png" ? <>
        <Avatar
        src={`/assets/icons/person-circle-svgrepo-com.svg`}
        alt={data.attributes.fullName}
        sx={{
          width: 36,
          height: 36,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
        }}
      >
        {data.attributes.fullName}
      </Avatar>
      </> : 
        <Avatar
        src={host + data.attributes.profileImage.data.attributes.formats.small.url}
        alt={data.attributes.fullName}
        sx={{
          width: 36,
          height: 36,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
        }}
      >
        {data.attributes.fullName}
      </Avatar>
      }
        
      </IconButton>}

      <Popover
        open={!!open}
        anchorEl={open}
        // onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        {data && <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
          <p className='iran-sans'>{data.attributes.fullName}</p>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
          <p className='iran-sans'>{data.attributes.email}</p>
          </Typography>
        </Box>}

        {/* <Divider sx={{ borderStyle: 'dashed' }} />
        {MENU_OPTIONS.map((option) => (
          <MenuItem key={option.label} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
        <Divider sx={{ borderStyle: 'dashed', m: 0 }} /> */}
        <Link to={"/dashboard/profile"} onClick={handleReload}>
          <MenuItem
            disableRipple
            disableTouchRipple
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1.5 }}
          >
            <p className='iran-sans'>پروفایل</p>
          </MenuItem>
        </Link>

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleExit}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          <p className='iran-sans'>خروج</p>
        </MenuItem> 
      </Popover> </>}
    </>
  );
}
