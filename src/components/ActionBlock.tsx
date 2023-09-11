import { FC, PropsWithChildren, ReactNode, memo } from "react";
import {
  Accordion,
  AccordionDetails,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRender } from "../hooks/useRender";

type Props = PropsWithChildren<{
  nodeElement: ReactNode;
  isBranch: boolean;
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
  ({ children, nodeElement, isBranch }) => {
    // Show rendering effect
    const renderElementRef = useRender();

    return isBranch ? (
      <Accordion
        defaultExpanded={true}
        disableGutters
        sx={{ backgroundColor: "rgba(117, 178, 221, 0.2)" }}
        ref={renderElementRef}
      >
        <AccordionSummary>{nodeElement}</AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>{children} </Stack>
        </AccordionDetails>
      </Accordion>
    ) : (
      <Paper sx={{ p: 2, backgroundColor: "#211551" }}>{nodeElement}</Paper>
    );
  }
);
