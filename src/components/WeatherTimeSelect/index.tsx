import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import "./index.css"

export default function WeatherTimeSelect() {
  return (
    <div className='weather-time-select-box'>
        <h4>Select a time period</h4>
        <Stack direction="row" spacing={2}>
            <Link to="/weather/current" style={{textDecoration: 'none'}}>
                <Button>Current</Button>
            </Link>
        </Stack>
    </div>
  );
}