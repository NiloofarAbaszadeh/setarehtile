import { Helmet } from 'react-helmet-async';

import { BlogView } from '../sections/blog/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> بلاگ | کاشی و سرامیک ستاره  </title>
      </Helmet>

      <BlogView />
    </>
  );
}
