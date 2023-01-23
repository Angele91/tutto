import { Box, Card, CardFooter, CardHeader, IconButton } from "@chakra-ui/react"
import dayjs from "dayjs"
import { MdDelete } from "react-icons/md"
import { useNotes } from "../../hooks/notes/useNotes"

export const Note = ({ item, ...rest }) => {
  const { deleteNote } = useNotes();

  return (
    <Card
      w="200px"
      {...rest}
    >
      <CardHeader>
        {item.title}
      </CardHeader>
      <CardFooter justifyContent="space-between" alignItems="center">
        <Box>
          {dayjs(item.createdAt).format("DD/MM/YYYY")}
        </Box>
        <IconButton
          variant="ghost"
          icon={<MdDelete />}
          colorScheme="red"
          onClick={(evt) => {
            evt.stopPropagation();
            deleteNote(item.id);
          }}
        />
      </CardFooter>
    </Card>
  )
}