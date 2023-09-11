import Container from '@mui/material/Container';
import { Button, Box } from '@mui/material';
import { useState } from 'react';
import { TreeNodeComponent } from './TreeNodeComponent';

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <Container maxWidth="sm" sx={{ p: 4 }}>
      <TreeNodeComponent nodeId="root" />

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={() => setCount(count + 1)}>
          Clicked: {count}
        </Button>
      </Box>
    </Container>
  );
};
