import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Link, redirect } from 'react-router-dom'

export const FavoriteTilesLoader = () => {
  if (localStorage.getItem("userRole") !== "نماینده") {
    alert("شما اجازه دسترسی به این صفحه را ندارید.")
    return redirect("/dashboard")
  }
  return null
}

const FavoriteTiles = () => {
    
  const token = useSelector(state => state.State.readToken)
  const host = useSelector(state => state.State.host)

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    const user = localStorage.getItem("userInfo")
    const GetData = async () => {
      // eslint-disable-next-line
        await axios.get(`${host}/api/karbrans?filters\[username]=${user}&populate=deep`, {
            headers: { Authorization: `Bearer ${token}` }
          }).then(res => {
            if (res.data.data[0].attributes.favorite !== null) {
              setData(res.data.data[0].attributes.favorite.map(item => {
                return {
                    id:item.tileId,
                    cover: item.tileData.image,
                    name: item.tileName,
                    price: 20,
                    priceSale:null,
                  }
            }))
            } else {
              setData(null)
            }
            
            setLoading(true) 
          })
          
    }
    GetData()

  },[host, token])

  return (<>
    {loading && <Container>
    <Typography variant="h4" sx={{ mb: 5 }}>
      کاشی های مورد علاقه
    </Typography>
    {data === null && <div className="flex items-center justify-center">
        <p className="text-[20px] text-fastblue mt-32">موردی جهت نمایش وجود ندارد </p>
      </div>}

    <Grid container spacing={3}>
      { data !== null && data.map((product) => (
        <Grid key={product.id} xs={12} sm={6} md={3}>
          {/* <ProductCard product={product} /> */}
          <div className="box-shadow rounded-[5px] bg-white">
            <div className="py-8 px-8">
            <Link to={`../../product-tilse/${product.name}`} >

                <img src={product.cover} alt={product.name}></img>
            </Link>    
            </div>
            <div className="pr-4 py-3 bg-lightgray rounded-b-[5px] border-t-[1px] border-red">
                <Link to={`../../product-tilse/${product.name}`} ><p className="text-[17px]">{product.name}</p></Link>
            </div>
          </div>
        </Grid>
      ))}
    </Grid>

    {/* <ProductCartWidget /> */}
  </Container>
        
    }</>
  );
}

export default FavoriteTiles