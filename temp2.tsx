import React, { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MultiSelectFilter from './MultiSelectFilter'; // импорт компонента выше

const App = () => {
  const [filterAnchor, setFilterAnchor] = useState<HTMLElement | null>(null);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);

  const authors = [
    { value: 'sync_bpm', label: 'Сервис синхронизации BPM' },
    { value: 'sync_departments', label: 'Сервис синхронизации подразделений' },
    { value: 'sync_employees', label: 'Сервис синхронизации сотрудников' },
    { value: 'login', label: 'Login' },
  ];

  const handleOpenFilter = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setFilterAnchor(null);
  };

  const handleApplyFilter = (selected: string[]) => {
    setSelectedAuthors(selected);
    // Здесь можно применить фильтр к данным таблицы
    console.log('Выбрано:', selected);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Автор
              <IconButton size="small" onClick={handleOpenFilter}>
                <ArrowDropDownIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{selectedAuthors.length ? `Фильтр: ${selectedAuthors.join(', ')}` : 'Без фильтра'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <MultiSelectFilter
        anchorEl={filterAnchor}
        open={Boolean(filterAnchor)}
        onClose={handleCloseFilter}
        options={authors}
        selectedValues={selectedAuthors}
        onChange={handleApplyFilter}
        title="Автор"
      />
    </div>
  );
};

export default App;
