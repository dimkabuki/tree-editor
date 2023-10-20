import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import {
  Accordion,
  AccordionDetails,
  AccordionSummaryProps,
  IconButton,
  AccordionSummary as MuiAccordionSummary,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { FC, PropsWithChildren, ReactNode, memo } from "react";
import { useRender } from "../hooks/useRender";

type Props = PropsWithChildren<{
  nodeContent: ReactNode;
  isBranch: boolean;
  onDeleteClick?: () => void;
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

const ContentWithDelete: FC<Pick<Props, "onDeleteClick" | "nodeContent">> = ({
  nodeContent,
  onDeleteClick,
}) => (
  <Stack
    direction="row"
    spacing={1}
    alignItems="center"
    justifyContent="space-between"
    flexGrow={1}
  >
    <div>{nodeContent}</div>
    <IconButton
      size="small"
      aria-label="delete"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDeleteClick?.();
      }}
      sx={{
        opacity: 0.3,
        "&:hover": {
          opacity: 0.8,
        },
      }}
    >
      <DeleteOutlined color="warning" />
    </IconButton>
  </Stack>
);

export const NodeBlock: FC<Props> = memo(
  ({ children, nodeContent, isBranch, onDeleteClick }) => {
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
          <ContentWithDelete {...{ onDeleteClick, nodeContent }} />
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>{children}</Stack>
        </AccordionDetails>
      </Accordion>
    ) : (
      <Paper sx={{ p: 1, backgroundColor: "#211551" }}>
        <ContentWithDelete {...{ onDeleteClick, nodeContent }} />
      </Paper>
    );
  }
);
