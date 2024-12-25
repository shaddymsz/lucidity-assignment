import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Typography } from '@mui/material';
import { toggleAdmin } from '../store/inventorySlice';

const ModeSwitch = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.inventory.isAdmin);

  const handleToggle = () => {
    dispatch(toggleAdmin());
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center',  width : '100%' ,justifyContent : 'flex-end'}}>
      <Typography variant="h6" style={{ marginRight: '10px' }}>
        User
      </Typography>
      <Switch checked={isAdmin} onChange={handleToggle} color="primary" />
      <Typography variant="h6" style={{ marginLeft: '10px' }}>
        Admin
      </Typography>
    </div>
  );
};

export default ModeSwitch;
