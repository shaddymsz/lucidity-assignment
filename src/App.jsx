import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInventory } from './store/inventorySlice';
import ModeSwitch from './components/ModeSwitch';
import Widgets from './components/Widgets';
import InventoryTable from './components/InventoryTable';
import './index.css';

const App = () => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);

  const handleEdit = (row) => {
    setEditData(row);
  };

  return (
    <div className="app">

      <header className="header">
        <ModeSwitch />
      </header>


      <div className="content">
        <div className="widgets-section">
          <h2>Inventory Stats</h2>
          <Widgets />
        </div>
        <InventoryTable onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default App;
