import { FC, PropsWithChildren, ReactNode, memo } from 'react';
import {
  Accordion,
  AccordionDetails,
  Paper,
  Stack,
  Item,
  styled,
} from '@mui/material';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useRender } from '../hooks/useRender';

type Props = PropsWithChildren<{
  childrenHash: string;
  nodeElement: ReactNode;
  isBranch: boolean;
}>;

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ChevronRightIcon />} {...props} />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export const ActionBlock: FC<Props> = memo(
  ({ children, nodeElement, isBranch }) => {
    // Show rendering effect
    const renderElementRef = useRender();

    return isBranch ? (
      <Accordion
        defaultExpanded={true}
        disableGutters
        sx={{ backgroundColor: 'rgba(117, 178, 221, 0.2)' }}
        ref={renderElementRef}
      >
        <AccordionSummary>{nodeElement}</AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>{children} </Stack>
        </AccordionDetails>
      </Accordion>
    ) : (
      <Paper sx={{ p: 2, backgroundColor: '#9DE7D7' }}>{nodeElement}</Paper>
    );
  },
  (oldProps, newProps) =>
    isArray(oldProps.children) &&
    isArray(newProps.children) &&
    // check all childred match, exept last ones (recursion)
    isEqual(oldProps.children.slice(0, -1), newProps.children?.slice(0, -1)) &&
    // check children "snapshot"
    oldProps.childrenHash === newProps.childrenHash
);
