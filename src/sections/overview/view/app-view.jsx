import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';
import Iconify from '../../../Components/iconify';
import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';
import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function AppView() {

  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data,setData] = useState()

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
  }, [host, token]);

  return (<>
    {data && <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
      {data.attributes.role === "نماینده" ? <>نماینده محترم  </> : <>کاربر گرامی </>}{data.attributes.fullName} خوش آمدید
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="فروش هفتگی"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="نمایندگان "
            total={1352831}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="محصولات خریداری شده"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="گزارش ها"
            total={234}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="بازدید های سایت"
            subheader="(+43%) بیشتر از ماه قبل"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: ' ماه قبل',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: ' این ماه',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'میانگین ',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="بازدید های اخیر"
            chart={{
              series: [
                { label: 'آسیا', value: 4344 },
                { label: 'آمریکا', value: 5435 },
                { label: 'اروپا', value: 1443 },
                { label: 'آفریقا', value: 4443 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
        <AppTasks
            title="کار ها"
            list={[
              { id: '1', name: 'اولین کار در حال انجام' },
              { id: '2', name: 'بازدید از فلان مکان' },
              { id: '3', name: 'جلسه جمع بندی' },
              { id: '4', name: 'شروع پروژه طرح توسعه' },
              { id: '5', name: 'بررسی خرابی های احتمالی' },
              { id: '6', name: 'بازدید از بخش های آسیب دیده' },
              { id: '7', name: 'خواب در بازه زمانی نهار' },
              { id: '8', name: 'دیگه نمیدونم والا' },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="موضوع کنونی"
            chart={{
              categories: ['انگلیسی', 'تاریخی', 'فیزیکی', 'کیفیت', 'فارسی', 'ریاضی'],
              series: [
                { name: 'تیم بازرگانی', data: [80, 50, 30, 40, 100, 20] },
                { name: 'تیم تولید', data: [20, 30, 40, 80, 20, 80] },
                { name: 'تیم مدیریت', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="اخبار جدید"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="خط زمانی سفارش ها"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'گزارش مرتبط با خرابی های...',
                'حضور در جلسه طرح توسعه...',
                'بازدید از شرکت فلان برای....',
                'ساخت و تعمیرات مربوط به دستگاه ...',
                'افزودن درخواست جدید برای...',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="ترافیک در سایت"
            list={[
              {
                name: 'فیسبوک',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'گوگل',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'لینکدین',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'تویتر',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>
      </Grid>
    </Container>}
    </>
  );
}
