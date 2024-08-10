import { Helmet } from 'react-helmet-async';

import { AppView } from '../sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> داشبرد | کاشی و سرامیک ستاره </title>
      </Helmet>

      <AppView />
    </>
  );
}
