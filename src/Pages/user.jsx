import { Helmet } from 'react-helmet-async';

import { UserView } from '../sections/user/view';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// ---------------------------------------------------------------------- 

export default function UserPage() {

  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)
  
  const [data,setData] = useState()

  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/karbrans?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        setData(res.data.data.map((item,i) => {
          return {
            avatarUrl: host + item.attributes.profileImage.data.attributes.formats.small.url,
            company: item.attributes.company,
            id: i,
            isVerified: item.attributes.isVerified,
            name: item.attributes.fullName,
            role: item.attributes.role,
            status: item.attributes.status,
          }
        }))
      })
    }
    GetData()
  }, [host, token])
  
  return (
    <>
      <Helmet>
        <title> کاربران | کاشی و سرامیک ستاره  </title>
      </Helmet>
      {data && <UserView data={data}/>}
    </>
  );
}
