import {
  Box,
  Card,
  CardFooter,
  CardHeader,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { MdDelete } from "react-icons/md";
import { useApp } from "../../hooks/app/useApp";
import { useNotes } from "../../hooks/notes/useNotes";
import { CustomField } from "../CustomField";

export const Note = ({ item, ...rest }) => {
  const {
    app: { customFields },
  } = useApp();
  const { deleteNote } = useNotes();

  return (
    <Card w="200px" {...rest}>
      <CardHeader>{item.title}</CardHeader>
      <CardFooter justifyContent="space-between" alignItems="center">
        <Flex flexDir="column">
          <Flex alignItems="center">
            <Box>{dayjs(item.createdAt).format("DD/MM/YYYY")}</Box>
            <IconButton
              variant="ghost"
              icon={<MdDelete />}
              colorScheme="red"
              onClick={(evt) => {
                evt.stopPropagation();
                deleteNote(item.id);
              }}
            />
          </Flex>
          <Flex>
            {customFields
              .filter(
                (customField) =>
                  customField.entityType === "notes" && customField.inline
              )
              .map((customField) => (
                <CustomField
                  key={`custom-field-${customField.id}`}
                  entityId={item.id}
                  fieldId={customField.id}
                  mini
                />
              ))}
          </Flex>
        </Flex>
      </CardFooter>
    </Card>
  );
};
