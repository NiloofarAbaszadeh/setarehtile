import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useResponsive } from '../../hooks/use-responsive';
import { bgBlur } from '../../theme/css';
import Iconify from '../../Components/iconify';
// import Scrollbar from '../../Components/scrollbar';
// import Searchbar from './common/searchbar';
import { HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
// import LanguagePopover from './common/language-popover';
// import NotificationsPopover from './common/notifications-popover';
import logo from "../../Assets/images/logo.png"
import { useStopwatch } from 'react-timer-hook';

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const {
    seconds,
    minutes,
    hours,
  } = useStopwatch({ autoStart: true });

  const renderContent = (
    <div className='flex lg:flex-row-reverse items-center justify-between'>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}
      {(window.innerWidth <= 767 || window.innerWidth >= 1200) && <Box>
        <img className='w-[75px]' src={logo} alt='logo' />
      </Box>}


      {window.innerWidth >= 767 && <Box >
        <div className='text-black sm:hidden' style={{fontSize: '24px'}}>
          <span>{seconds}</span> : <span>{minutes}</span> : <span>{hours}</span>
        </div>
      </Box>}

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        {/* <NotificationsPopover /> */}
        <AccountPopover />
      </Stack>
    </div>
  );

  return (
    <AppBar
    
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `100%`,
          height: HEADER.H_DESKTOP,
        }),
      }}
    >
      <div
        className='p-3 mx-6'
      >
        {renderContent}
      </div>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
