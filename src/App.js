import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from './store/index.js';
import { persistor } from './store/index.js';
import Profile from './pages/profile.js';
import Items from './pages/items.js';
import CreateItem from './pages/create_item.js';
import Item from './pages/item.js';
import Bidding from './pages/bidding.js';
import Notify from './pages/notfications.js';
import Navbar from './components/Navbar.js';
import Home from './pages/Homepage.js';

function App() {
  return (
    
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
      <div className="App">
          <BrowserRouter>
              <Navbar/>
              <Routes>
                <Route path="/" element={<Home/>}/> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/items" element={<Items/>}/>
                <Route path="/upload_item" element={<CreateItem/>}/>
                <Route path="/items/:id" element={<Item/>}/>
                <Route path="/bids/:id" element={<Bidding/>}/>
                <Route path="/notif" element={<Notify/>}/>
              </Routes>
          </BrowserRouter>
      </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
