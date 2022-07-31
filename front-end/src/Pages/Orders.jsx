import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const Orders = () => {

  const [orders, setOrders] = useState([])

  const getData = () => {
    axios.get(`http://localhost:3001/orders`).then((res) => { setOrders(res.data) });
  }



  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <div style={{ border: "1px solid gray", borderRadius: "10px", padding: "10px", margin: "30px", height: "550Px", overflow: "scroll" }}>
        {
          orders.map((el) => (
            <div key={el.id}>
              <h1>{el.time}</h1>
              {
                el.items.map((items) => (
                  <div style={{ display: "flex", width: "95%", justifyContent: "space-between" ,margin: "auto", marginTop: "20px", border: "1px solid gray", borderRadius: "10px", padding: "20px" }}>
                    <div>
                      <img style={{ width: "170px" }} src={items.imageBase + "/" + String(items.hex).slice(1)} alt="" />
                    </div>
                    <div>
                      <h3>{items.title}</h3>
                      <h2>₹  {items.price}</h2>
                    </div>
                    <div>
                      <h2>Total</h2>
                      <h3>₹ {items.price * items.count}</h3>
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </>
  )
}
