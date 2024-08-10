import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

export const users = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: sample([
    'علی چاووشی',
    'سمیه نادری',
    'اخوان ثالث',
    'شمس تبریزی',
    'ستاره دهقان',
    'ثریا زارع',
    'نیلوفر عباس زاده',
  ]),
  company: sample([
    'کاشی و سرامیک ستاره',
  ]),
  isVerified: faker.datatype.boolean(),
  status: sample(['فعال', 'غیر فعال']),
  role: sample([
    'سرپرست',
    'مدیر منابع انسانی',
    'طراحی',
    'بازرگانی',
    'مدیریت',
    'مسئول پروژه',
    'برنامه نویس',
  ]),
}));


// import { sample } from 'lodash';
// import { faker } from '@faker-js/faker';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// // ----------------------------------------------------------------------

// export default users () {
  
//   const token = useSelector(state => state.State.readToken)
//   const host = useSelector(state => state.State.host)

//   const [data, setData] = useState()
//   const [loading, setLoading] = useState(false) 

//   useEffect(() => {
//     const GetData = async () => {
//       await axios.get(`${host}/api/karbrans?populate=deep`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//       .then(res => {
//         setData(res.data.data.map((item,i) => {
//           return {
//             avatarUrl: host + item,
//             company: "",
//             id: data.attributes.username,
//             isVerified: false,
//             name: data.attributes.fulName,
//             role: "",
//             status: "",
//           }
//         }))
//       })
//     }
//     GetData()
//   },[])
// } 


