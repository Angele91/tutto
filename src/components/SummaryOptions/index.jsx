import {
  Button,
  ButtonGroup,
  Card,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { capitalize } from "lodash";
import { FiCalendar } from "react-icons/fi";
import { useApp } from "../../hooks/app/useApp";

export const SummaryOptions = () => {
  const {
    app: { summarySettings },
    setSummarySettings,
  } = useApp();

  const onChangeAmount = (amount) => () => { 
    setSummarySettings({ ...summarySettings, amount })
  }

  const onChangeUnit = (unit) => () => {
    setSummarySettings({ ...summarySettings, unit })
  }

  const amounts = [3, 6, 9, 12];
  const units = ["day", "week", "month"];

  return (
    <Card as={Flex} flexDir="row" padding="16px">
      <Flex w="full" justifyContent="space-between">
        <Tooltip label="Amount">
          <ButtonGroup variant="outline" isAttached>
            <Button>
              <FiCalendar />
            </Button>
            {amounts.map((amount) => (
              <Button
                key={amount}
                value={amount}
                onClick={onChangeAmount(amount)}
                isActive={amount === summarySettings.amount}
              >
                {amount}
              </Button>
            ))}
          </ButtonGroup>
        </Tooltip>
        <Tooltip label="Unit">
          <ButtonGroup variant="outline" isAttached>
            {units.map((unit) => (
              <Button
                key={unit}
                value={unit}
                onClick={onChangeUnit(unit)}
                isActive={unit === summarySettings.unit}
              >
                {capitalize(unit)}
              </Button>
            ))}
            <Button>
              <FiCalendar />
            </Button>
          </ButtonGroup>
        </Tooltip>
      </Flex>
    </Card>
  );
};
