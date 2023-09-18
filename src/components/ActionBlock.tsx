import { FC, PropsWithChildren, ReactNode, memo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  IconButton,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRender } from "../hooks/useRender";

type Props = PropsWithChildren<{
  nodeElement: ReactNode;
  isBranch: boolean;
  onDeleteClick: () => void;
}>;

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ChevronRightIcon />} {...props} />
))(({ theme }) => ({
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

export const ActionBlock: FC<Props> = memo(
  ({ children, nodeElement, isBranch, onDeleteClick }) => {
    // Show rendering effect
    const renderElementRef = useRender();

    return isBranch ? (
      <Accordion
        defaultExpanded={true}
        disableGutters
        sx={{ backgroundColor: "rgba(117, 178, 221, 0.2)" }}
        ref={renderElementRef}
      >
        <AccordionSummary>
          <Stack direction="row" spacing={1}>
            {nodeElement}
            <IconButton aria-label="delete" onClick={onDeleteClick}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>{children} </Stack>
        </AccordionDetails>
      </Accordion>
    ) : (
      <Paper sx={{ p: 2, backgroundColor: "#211551" }}>{nodeElement}</Paper>
    );
  }
);
