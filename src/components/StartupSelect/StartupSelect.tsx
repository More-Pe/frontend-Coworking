import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { getAllStartups } from '../../services/StartupService';
import { Startup, StartupSelectProps } from '../../types';


const StartupSelect: React.FC<StartupSelectProps> = ({ value, onChange, disabled = false }) => {
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await getAllStartups();
        if (response && response.success) {
          setStartups(response.data);
        } else {
          console.error('Error fetching startups:', response);
        }
      } catch (error) {
        console.error('Error fetching startups:', error);
      }
    };

    fetchStartups();
  }, []);

  return (
    <Select
      name="startup"
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      disabled={disabled}
      displayEmpty
    >
      <MenuItem
						value=''
						disabled>
						Select Startup
					</MenuItem>
      {startups.map((startup) => (
        <MenuItem key={startup.startup_id} value={startup.name}>
          {startup.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default StartupSelect;
