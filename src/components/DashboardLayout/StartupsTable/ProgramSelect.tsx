import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { ProgramSelectProps } from '../../../types';

const ProgramSelect: React.FC<ProgramSelectProps> = ({ programs, value, onChange }) => {
  return (
    <Select
      name="program"
      value={value}
      onChange={onChange}
      variant="standard"
      fullWidth
    >
      {programs.map((program) => (
        <MenuItem key={program} value={program}>
          {program}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ProgramSelect;