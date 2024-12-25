import  { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Edit, Delete, VisibilityOff } from '@mui/icons-material'; 
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, disableProduct } from '../store/inventorySlice';
import { DataGrid } from '@mui/x-data-grid';
import EditModal from './EditModal';

const InventoryTable = () => {
  const dispatch = useDispatch();
  const { products, isAdmin } = useSelector((state) => state.inventory);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleDisable = (id) => {
    dispatch(disableProduct(id));
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpenEditModal(true);
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    { field: 'value', headerName: 'Value', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        const { id, disabled } = params.row;

        const buttonColor = disabled || !isAdmin ? 'gray' : undefined;

        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Tooltip title="Edit">
              <IconButton
                onClick={() => handleEdit(params.row)}
                disabled={disabled || !isAdmin}
                style={{ color: buttonColor || 'green' }}
              >
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip title="Disable">
              <IconButton
                onClick={() => handleDisable(id)}
                disabled={disabled || !isAdmin}
                style={{ color: buttonColor || 'purple' }}
              >
                <VisibilityOff />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                onClick={() => handleDelete(id)}
                disabled={disabled || !isAdmin}
                style={{ color: buttonColor || 'red' }}
              >
                <Delete />
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const rows = products.map((product, index) => ({
    id: index,
    ...product,
  }));

  return (
    <div style={{ height: 500, width: '100%', marginTop: '40px' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
      <EditModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        productData={selectedProduct}
      />
    </div>
  );
};

export default InventoryTable;
