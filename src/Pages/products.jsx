import { Helmet } from 'react-helmet-async';

import { ProductsView } from '../sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> محصولات | کاشی و سرامیک ستاره  </title>
      </Helmet>
      <ProductsView />
    </>
  );
}
