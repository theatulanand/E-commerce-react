import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom'

export const MediaCard = ({ title, imageBase, hex, price, rating , id}) => {

  let image = imageBase + "/";

  for (let i = 1; i < hex.length; i++) {
    image = image + hex[i];
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt="green iguana"
      />
      <CardContent>
        <Typography style={{height: "100px"}} gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <Typography style={{background: "green", borderRadius: "8px", padding: "5px" , color: "white"}} variant="body2" color="text.secondary">
            {"₹ " + price}
          </Typography>
          <Typography style={{background: "blue", borderRadius: "8px", padding: "5px" , color: "white"}} variant="body2" color="text.success">
            {"⭐ " + rating}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Link to = {`/product/view/${id}`}><Button fullWidth variant= "contained" size="small">View Item</Button></Link>
      </CardActions>
    </Card>
  );
}