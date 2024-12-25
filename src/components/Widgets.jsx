import { useSelector } from 'react-redux';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { ShoppingCart, MonetizationOn, Warning, Category } from '@mui/icons-material';

const Widgets = () => {
  const products = useSelector((state) => state.inventory.products);
  
  const activeProducts = products.filter((product) => !product.disabled);

  const totalProducts = activeProducts.length;
  const totalStoreValue = activeProducts.reduce((total, product) => {
    const price = parseFloat(product.price.replace('$', '').trim()) || 0;
    const quantity = parseInt(product.quantity, 10) || 0;
    return total + price * quantity;
  }, 0);
  const outOfStock = activeProducts.filter((product) => {
    const quantity = parseInt(product.quantity, 10) || 0;
    return quantity === 0;
  }).length;
  const categoriesCount = new Set(activeProducts.map((product) => product.category)).size;

  const widgetData = [
    { 
      label: 'Total Products', 
      value: totalProducts, 
      icon: <ShoppingCart fontSize="large" color="primary" />, 
      bgColor: '#f0f9ff' 
    },
    { 
      label: 'Total Store Value', 
      value: `$${totalStoreValue.toFixed(2)}`, 
      icon: <MonetizationOn fontSize="large" color="secondary" />, 
      bgColor: '#fef9f0' 
    },
    { 
      label: 'Out of Stock', 
      value: outOfStock, 
      icon: <Warning fontSize="large" color="error" />, 
      bgColor: '#fff0f0' 
    },
    { 
      label: 'Categories', 
      value: categoriesCount, 
      icon: <Category fontSize="large" color="success" />, 
      bgColor: '#f0fff4' 
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
      {widgetData.map((widget, index) => (
        <Card 
          key={index} 
          style={{ 
            width: '25%', 
            display: 'flex', 
            alignItems: 'top', 
            padding: '10px', 
            backgroundColor: widget.bgColor, 
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
          }}
        >
          <Box 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              backgroundColor: 'white',
              marginRight: '15px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' 
            }}
          >
            {widget.icon}
          </Box>
          <CardContent style={{ padding: 0 }}>
            <Typography variant="h6" style={{ fontWeight: 600, marginBottom: '5px' }}>
              {widget.label}
            </Typography>
            <Typography variant="h4">{widget.value}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Widgets;
