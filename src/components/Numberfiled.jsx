import * as React from 'react';
import Box from '@mui/material/Box';
import NumberField from './components/NumberField';

export default function FieldDemo() {
  return (
    <Box >
   
      <NumberField label="Number Field (Small)" size="small" />
  
    </Box>
  );
}