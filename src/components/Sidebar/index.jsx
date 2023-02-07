import { Card, Divider, IconButton, Tooltip } from "@chakra-ui/react"
import { useNavigate } from "@reach/router"
import { capitalize } from "lodash"
import { FiBook, FiBookmark, FiList } from "react-icons/fi"
import { CustomFieldModal } from "../CustomFieldModal"

const PAGES = ['tasks', 'summary', 'notes']

const mapPageToIcons = {
  tasks: <FiList />,
  summary: <FiBookmark />,
  notes: <FiBook />,
}

export const Sidebar = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => () => navigate(path);

  return (
    <Card ml="20px" h="full" width="80px" my="20px" p="4">
      {PAGES.map((page) => (
        <Tooltip label={capitalize(page)} key={page}>
          <IconButton
            icon={mapPageToIcons[page]}
            variant="ghost"
            colorScheme="gray"
            mb="2"
            onClick={navigateTo(page === 'tasks' ? '/' : `/${page}`)}
            isActive={window.location.pathname === `/${page}`}
          />
        </Tooltip>
      ))}
      <Divider my="8" />
      <CustomFieldModal />
    </Card>
  )
}