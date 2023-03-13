import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

function SpecificTable({ games }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game._id}>
            <TableCell component="th" scope="row">
              {game.title}
            </TableCell>
            <TableCell>{game.desc}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SpecificTable;
