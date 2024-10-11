import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { RoomUsageReportProps } from '../../../types';

const RoomUsageReport: React.FC<RoomUsageReportProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography>No room usage data available.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room Name</TableCell>
            <TableCell>Total Uses</TableCell>
            <TableCell>Average Stay</TableCell>
            <TableCell>Absences</TableCell>
            <TableCell>Peak Hour</TableCell>
            <TableCell>Longest Period Without Use</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((room) => (
            <TableRow key={room.room_name}>
              <TableCell>{room.room_name}</TableCell>
              <TableCell>{room.totalUses}</TableCell>
              <TableCell>{room.averageStay}</TableCell>
              <TableCell>{room.absences}</TableCell>
              <TableCell>{room.peakHour}</TableCell>
              <TableCell>{room.longestPeriodWithoutUse}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoomUsageReport;
