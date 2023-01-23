import { Card, IconButton } from "@chakra-ui/react"
import { useNavigate } from "@reach/router"
import { FiBook, FiList } from "react-icons/fi"

export const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <Card ml="20px" h="full" width="80px" my="20px" p="4">
      <IconButton 
        icon={<FiList />}
        variant="ghost"
        colorScheme="gray"
        mb="2"
        onClick={() => navigate('/')}
      />
      <IconButton
        icon={<FiBook />}
        variant="ghost"
        colorScheme="gray"
        mb="2"
        onClick={() => navigate('/notes')}
      />
    </Card>
  )
}