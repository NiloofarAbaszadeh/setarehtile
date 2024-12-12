import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer'
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';
import { useResponsive } from '../../hooks/use-responsive';
import { account } from '../../_mock/account';
import Scrollbar from "../../Components/scrollbar/index"
import { NAV } from './config-layout';
import navConfigNamayandeh, {navConfigInfo, navConfigKarbar} from './config-navigation';
import axios from 'axios';
import { useSelector } from 'react-redux'
import ic_resume from "../../Assets/navbar/ic_resume.svg"
import ic_inventory from "../../Assets/navbar/ic_inventory.png"
import ic_link from "../../Assets/navbar/ic-link.svg"

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  const pathname = usePathname()
  const [data,setData] = useState()
  const [nav, setNav] = useState() 
  const [loading, setLoading] = useState(false)
  const upLg = useResponsive('up', 'lg')
  const [openLink, setOpenLink] = useState(false)
  const [inventorys, setInventorys] = useState(0)
  const [massages, setMassages] = useState(0)
  // const [link, setLink] = useState(0)
  const [file, setfile] = useState(0)
  const [resumes, setResumes] = useState(0)

  const resume = {
    title: 'روزمه ها',
    path: '/dashboard/resume',
    icon: ic_resume,
  }

  const inventory = {
    title: 'موجودی کاشی ها',
    path: '/dashboard/upload-inventory',
    icon: ic_inventory,
  }

  useEffect(() => {
    setLoading(false)
    if (openNav) {
      onCloseNav();
    }
    
    const GetData = async () => {
      const username = localStorage.getItem("userInfo")
      // eslint-disable-next-line
      await axios.get(`${host}/api/karbrans?filters\[username]=${username}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        localStorage.setItem("userId", res.data.data[0].id)
        setData(res.data.data[0])
        res.data.data[0].attributes.seen === null ? Initialize(res.data.data[0].id) : CheckSeen(res.data.data[0].attributes.role, res.data.data[0].attributes.seen, res.data.data[0].id)
      })
      await axios.get(`${host}/api/cartable-link?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setNav(res.data.data)
      })
    }

    const Initialize = async (id) => {
      await axios.put(`${host}/api/karbrans/${id}`, {
        data: {
          seen: {
            "Inventory" : [],
            "Massages": [],
            "Links": [],
            "Files": [],
            "Resume": [],
          }
        }
      })
    }

    const CheckSeen = (role, seen, id) => {
      const Update = (url, id, data, seen) => {
        const seened = data.map(item => {return item.id})
        if (url === "/dashboard/inventory") {
          axios.put(`${host}/api/karbrans/${id}`, {
            data: {
              seen: {
                "Files": seen.Files,
                "Links": seen.Links,
                "Resume": seen.Resume,
                "Massages": seen.Massages,
                "Inventory": seened
              }
            }
          })
        }
        if (url === "/dashboard/files") {
          axios.put(`${host}/api/karbrans/${id}`, {
            data: {
              seen: {
                "Files": seened,
                "Links": seen.Links,
                "Resume": seen.Resume,
                "Massages": seen.Massages,
                "Inventory": seen.Inventory
              }
            }
          })
        }
        if (url.split("/")[2] === "resume") {
          axios.put(`${host}/api/karbrans/${id}`, {
            data: {
              seen: {
                "Files": seened,
                "Links": seen.Links,
                "Resume": [...seen.Resume, parseInt(url.split("/")[3])],
                "Massages": seen.Massages,
                "Inventory": seen.Inventory
              }
            }
          })
        }
        if (url.split("/")[2] === "massages") {
          axios.put(`${host}/api/karbrans/${id}`, {
            data: {
              seen: {
                "Files": seened,
                "Links": seen.Links,
                "Resume": seen.Resume,
                "Massages": [...seen.Massages, parseInt(url.split("/")[3])],
                "Inventory": seen.Inventory
              }
            }
          })
        }
      }
      
      // axios.get(`${host}/api/cartable-link?populate=*`, {
        // headers: { Authorization: `Bearer ${token}` }
      // })
      // .then(res => {
        // (role === "نماینده" && res.data.data.attributes.AgentLink[0]) ? res.data.data.attributes.AgentLink.map(item => !link.includes(item.id) && setLink(per => {return per.push(item.id)})): <></>
        // (role !== "نماینده" && res.data.data.attributes.EmployeLink[0]) ? res.data.data.attributes.EmployeLink.map(item => !link.includes(item.id) && setLink(per => {return per.push(item.id)})): <></>
      // })

      axios.get(`${host}/api/mwjwdy-kashy-has?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        var count = 0
        // eslint-disable-next-line
        res.data.data.map(item => {seen.Inventory.some(val => val === item.id) === false && count++})
        setInventorys(count)
        pathname === "/dashboard/inventory" && Update(pathname, id, res.data.data, seen)
      })
      localStorage.getItem("userRole") === "نماینده" ?
      axios.get(`${host}/api/egent-notices?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        var count = 0
        // eslint-disable-next-line
        res.data.data.map(item => {seen.Massages.some(val => val === item.id) === false && count++})
        setMassages(count)
        pathname.split("/")[3] && Update(pathname, id, res.data.data, seen)
      }) :
      axios.get(`${host}/api/employee-notices?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        var count = 0
        // eslint-disable-next-line
        res.data.data.map(item => {seen.Massages.some(val => val === item.id) === false && count++})
        setMassages(count)
        pathname.split("/")[3] && Update(pathname, id, res.data.data, seen)
      })

      axios.get(`${host}/api/recruitment-forms?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        var count = 0
        // eslint-disable-next-line
        res.data.data.map(item => {seen.Resume.some(val => val === item.id) === false && count++})
        setResumes(count)
        pathname.split("/")[3] && Update(pathname, id, res.data.data, seen)
      })

      axios.get(`${host}/api/cartable-files?populate=*`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        var count = 0
        // eslint-disable-next-line
        res.data.data.map(item => {seen.Files.some(val => val === item.id) === false && count++})
        setfile(count)
        pathname === "/dashboard/files" && Update(pathname, id, res.data.data, seen)
      })
    }
    GetData()
    setLoading(true)
    // eslint-disable-next-line
  }, [host, token, pathname])

  const renderContent = (
    <Scrollbar
      className="mt-8"
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >

    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >

      <Box sx={{ ml: 2 }}>
        {data && <Typography variant="subtitle2"><span className='mr-5 pt-1'> {data.attributes.fullName} </span></Typography>}

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
    {data && nav && <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>  
      {data.attributes.role === "ادمین" ? navConfigInfo.map((item) => (
        <NavItem key={item.title} item={item} data={[inventorys, file, resumes, massages]} />
      )) : data.attributes.role === "نماینده" ? navConfigNamayandeh.map((item) => (
        <NavItem key={item.title} item={item} data={[inventorys, file, resumes, massages]} />
      )) : navConfigKarbar.map((item) => (
        <NavItem key={item.title} item={item} data={[inventorys, file, resumes, massages]} />
      ))}

      {data.attributes.role === "امور اداری" && <NavItem key="روزمه" item={resume} data={[inventorys, file, resumes, massages]} />}
      {data.attributes.role === "فروش" && <NavItem key="فروش" item={inventory} data={[inventorys, file, resumes, massages]} />}

    <ListItemButton
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
      }}
      onClick={() => setOpenLink(per => !per)}
    >
      <Box className='ml-3' component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        <img className='grayscale' src={ic_link} sx={{ width: 1, height: 1 }} alt="icon" />
      </Box>
      <Box component="span"> لینک ها </Box>
      {!openLink && <span className='text-[12px] ti-angle-left mr-2'></span>}
      {openLink && <span className='text-[12px] ti-angle-down mr-2'></span>}
    </ListItemButton>

    <Box
      className="pr-4"
    >
      {openLink ? <>
        {data.attributes.role === "ادمین" && nav.attributes.AdminLink[0] ? nav.attributes.AdminLink.map((item) => (
        <NavItem02 className="pr-8" key={item.LinkName} item={item} />
      )) : data.attributes.role === "نماینده" && nav.attributes.AgentLink[0] ? navConfigNamayandeh.map((item) => (
        <NavItem02 className="pr-8" key={item.LinkName} item={item} />
      )) : data.attributes.role !== "نماینده" && nav.attributes.EmployeLink && nav.attributes.EmployeLink.map((item) => (
        <NavItem02 className="pr-8" key={item.LinkName} item={item} />
      ))}
      </>
    : <></>}
    </Box>
    </Stack>}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
  <>
    {loading && <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>}
  </>
  );
}

// ----------------------------------------------------------------------

function NavItem(props) {
  const pathname = usePathname()
  const active = props.item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={props.item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box className='ml-3' component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        <img className='grayscale' src={props.item.icon} alt="icon"/>
      </Box>

      <Box component="span" className='w-full flex items-center justify-between'>
        <div>
          {props.item.title} 
        </div>
        <div>
          {/* /dashboard/massages */}
          {props.item.title === "موجودی کاشی ها" && props.data[0] > 0 && pathname !== "/dashboard/inventory" && <span className='px-2 pt-[1px] rounded-full bg-[#ff3030] text-white'> {props.data[0]}</span>}
          {props.item.title === "فایل ها" && props.data[1] > 0 && pathname !== "/dashboard/files" && <span className='px-2 pt-[1px] rounded-full bg-[#ff3030] text-white'> {props.data[1]}</span>}
          {props.item.title === 'روزمه ها' && props.data[2] > 0 && <span className='px-2 pt-[1px] rounded-full bg-[#ff3030] text-white'> {props.data[2]}</span>}
          {props.item.title === "اعلان ها و پیام ها" && props.data[3] > 0 && <span className='px-2 pt-[1px] rounded-full bg-[#ff3030] text-white'> {props.data[3]}</span>}
        </div>
      </Box>
      
    </ListItemButton>
  );
}

function NavItem02(props) {
  const pathname = usePathname();
  const active = props.item.path === pathname;
  
  const host = useSelector(state => state.State.host)
  
  return (
    <ListItemButton
      component={RouterLink}
      href={props.item.Link}
      target='_blank'
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box className='ml-3' component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        <span ><img className='grayscale' src={host + props.item.LinkIcon.data.attributes.url} alt={props.item.LinkName} /></span>
      </Box>
      <Box component="span">{props.item.LinkName} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
