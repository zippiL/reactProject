import { CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import Card from '@mui/joy/Card';

export default function ServiceItem(props) {
  const { name, description, price, duration, img } = props;

  return (
    <Card sx={{ maxWidth: 300, margin: 'auto' }}>
      <CardHeader title={name} />
      <CardMedia component="img" height="150" image={img} alt="Service Image" />
      <CardContent>
        <Typography sx={{ fontSize: '0.8rem' }}>{description}</Typography>
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Total price: {price}$</Typography>
        <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>Duration: {duration} Minutes</Typography>
      </CardContent>
    </Card>
  );
}
