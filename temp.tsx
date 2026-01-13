import React, { useState, useEffect } from 'react';
import {
  Popover,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
} from '@mui/material';

// Тип для элемента списка
interface FilterOption {
  value: string;
  label: string;
}

interface MultiSelectFilterProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  options: FilterOption[];
  selectedValues: string[];
  onChange: (selected: string[]) => void;
  title?: string;
}

const MultiSelectFilter: React.FC<MultiSelectFilterProps> = ({
  anchorEl,
  open,
  onClose,
  options,
  selectedValues,
  onChange,
  title = 'Фильтр',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [localSelected, setLocalSelected] = useState<string[]>(selectedValues);

  // Синхронизация локального состояния с внешним при открытии
  useEffect(() => {
    if (open) {
      setLocalSelected(selectedValues);
      setSearchTerm('');
    }
  }, [open, selectedValues]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (value: string) => {
    const currentIndex = localSelected.indexOf(value);
    const newSelected = [...localSelected];

    if (currentIndex === -1) {
      newSelected.push(value);
    } else {
      newSelected.splice(currentIndex, 1);
    }

    setLocalSelected(newSelected);
  };

  const handleSelectAll = () => {
    if (localSelected.length === filteredOptions.length) {
      setLocalSelected([]);
    } else {
      setLocalSelected(filteredOptions.map((opt) => opt.value));
    }
  };

  const handleApply = () => {
    onChange(localSelected);
    onClose();
  };

  const handleReset = () => {
    setLocalSelected([]);
    onChange([]);
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          p: 2,
          minWidth: 280,
          maxWidth: 360,
          borderRadius: 1,
        },
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        {title}
      </Typography>

      {/* Поиск */}
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Поиск..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Выбор всех */}
      <FormControlLabel
        control={
          <Checkbox
            checked={localSelected.length === filteredOptions.length && filteredOptions.length > 0}
            indeterminate={
              localSelected.length > 0 &&
              localSelected.length < filteredOptions.length &&
              filteredOptions.length > 0
            }
            onChange={handleSelectAll}
          />
        }
        label="Выбрать все"
        sx={{ mb: 1 }}
      />

      <Divider sx={{ mb: 1 }} />

      {/* Список опций */}
      <Box sx={{ maxHeight: 240, overflowY: 'auto' }}>
        {filteredOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                checked={localSelected.includes(option.value)}
                onChange={() => handleToggle(option.value)}
              />
            }
            label={option.label}
          />
        ))}
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Кнопки */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
          sx={{ mr: 1 }}
        >
          Сброс
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleApply}
          color="primary"
        >
          OK
        </Button>
      </Box>
    </Popover>
  );
};

export default MultiSelectFilter;
