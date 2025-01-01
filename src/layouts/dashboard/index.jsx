import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Nav from './nav';
import Main from './main';
import Header from './header';

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <div className='c-c-red block h-[50px]'>
        <Header onOpenNav={() => setOpenNav(true)} />
      </div>
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>{children}</Main>
      </Box>
    </>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
