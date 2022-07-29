import { Button, FormControl, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MediaCard } from '../Components/MediaCard';

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");



  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: `http://localhost:3001/products?_page=${page}&_limit=12`
    }).then((res) => {
      setProducts(res.data);
      setLoading(false);
      //console.log(products)
    }).catch((err) => {
      console.log(err);
      setLoading(false)
      setError(true);
    })
  }, [page]);

  const handleSort = (value) =>{
    setSort(value);
    setLoading(true);
    console.log(sort);
    axios({
      method: "get",
      url: `http://localhost:3001/products?_page=${page}&_limit=12&_sort=price&_order=${sort}`
    }).then((res) => {
      setProducts(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
      setLoading(false)
      setError(true);
    })
  }

  return (
    <>
      {loading ? <LinearProgress color="success" /> : error ? <h1>Something Went Wrong</h1> :
        <div>
          <div style={{ width: "20%", margin: "auto", marginTop: "20px"}}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort By Price</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Age"
                onChange={(e) => {handleSort(e.target.value)}}
              >
                <MenuItem value={"asc"}>High To Low</MenuItem>
                <MenuItem value={"desc"}>Low To High</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px", padding: "20px" }}>
            {
              products.map((el) => (
                <MediaCard key={el.id} {...el} />
              ))
            }
          </div>
        </div>
      }
      <div style={{ width: "20%", margin: "auto", display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <Button disabled={page === 1} onClick={() => setPage(page - 1)} variant="contained">prev</Button>
        <Button variant="outlined">{page}</Button>
        <Button disabled={products.length < 12} onClick={() => setPage(page + 1)} variant="contained">Next</Button>
      </div>
    </>
  )
}
