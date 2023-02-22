import logo from './logo.svg';
import './App.css';
import DataGrid from './LXUI/DataGrid';
import { useRef } from 'react';
import { Button } from '@mui/material';

function App() {
    const ref = useRef()
    return (
        <div className="App">
            <DataGrid ref={ref} disableProperty/>
            <Button onClick={()=>console.log(ref.current.matrix())}>click</Button>
        </div>
    );
}

export default App;
