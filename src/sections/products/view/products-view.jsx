import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)

  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    const GetData = async () => {
      await axios.get(`${host}/api/collectionss?populate=deep`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setData(res.data.data.map(item => {
          return {
            id:item.id,
            cover: host + item.attributes.profileImage.data.attributes.formats.custom.url,
            name: item.attributes.name,
            price: 20,
            priceSale:null,
          }
        }))
      })
      
    setLoading(true)
    }
    GetData()
  },[host, token])

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (<>
    {loading && <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        محصولات
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-start"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {loading && data.map((product) => (
          <Grid key={product.id} xs={12} sm={6} md={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>}</>
  );
}
