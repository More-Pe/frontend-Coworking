import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination } from '@mui/material';
import { DailyReportResponse, PeriodReportProps } from '../../../types';

const PeriodReport: React.FC<PeriodReportProps> = ({ data, page, totalPages, onPageChange }) => {
  if (!data || data.length === 0) {
    return <Typography>No data available for the selected period.</Typography>;
  }

  return (
    <>
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
            {data.map((report: DailyReportResponse) => (
              <TableRow key={report.report_date.toString()}>
                <TableCell>{new Date(report.report_date).toLocaleDateString()}</TableCell>
                <TableCell>{report.total_accesses.count}</TableCell>
                <TableCell>{report.total_absences}</TableCell>
                <TableCell>{report.frequent_users}</TableCell>
                <TableCell>{report.infrequent_users}</TableCell>
                <TableCell>{report.peak_hour}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </>
  );
};

export default PeriodReport;
