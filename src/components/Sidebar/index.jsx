import { Card, IconButton } from "@chakra-ui/react"
import { useNavigate } from "@reach/router"
import { FiBook, FiBookmark, FiList } from "react-icons/fi"

export const Sidebar = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => () => navigate(path);

  return (
    <Card ml="20px" h="full" width="80px" my="20px" p="4">
      <IconButton 
        icon={<FiList />}
        variant="ghost"
        colorScheme="gray"
        mb="2"
        onClick={navigateTo('/')}
      />
      <IconButton 
        icon={<FiBookmark />}
        variant="ghost"
        colorScheme="gray"
        mb="2"
        onClick={navigateTo('/summary')}
      />
      <IconButton
        icon={<FiBook />}
        variant="ghost"
        colorScheme="gray"
        mb="2"
        onClick={navigateTo('/notes')}
      />
    </Card>
  )
}