import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { DailyReportProps } from '../../../types';

const DailyReport: React.FC<DailyReportProps> = ({ data }) => {
  if (!data) return null;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Report Date</TableCell>
            <TableCell>Total Accesses</TableCell>
            <TableCell>Total Absences</TableCell>
            <TableCell>Frequent Users</TableCell>
            <TableCell>Infrequent Users</TableCell>
            <TableCell>Peak Hour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{new Date(data.report_date).toLocaleDateString()}</TableCell>
            <TableCell>{data.total_accesses.count}</TableCell>
            <TableCell>{data.total_absences}</TableCell>
            <TableCell>{data.frequent_users}</TableCell>
            <TableCell>{data.infrequent_users}</TableCell>
            <TableCell>{data.peak_hour}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Accesses by Room</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Room</TableCell>
            <TableCell>Accesses</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(data.accesses_by_room).map(([room, accesses]) => (
            <TableRow key={room}>
              <TableCell>{room}</TableCell>
              <TableCell>{accesses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Users with Access</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Startup</TableCell>
            <TableCell>Last Access</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.total_accesses.persons.map((person) => (
            <TableRow key={person.user_id}>
              <TableCell>{person.user_id}</TableCell>
              <TableCell>{`${person.first_name} ${person.last_name}`}</TableCell>
              <TableCell>{person.startup}</TableCell>
              <TableCell>{new Date(person.last_access).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DailyReport;
