import React, { useEffect, useContext, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  useToast,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import chatContext from "../../context/chatContext";
import Chats from "./Chats";
import { ChatArea } from "./ChatArea";

const Dashboard = () => {
  const context = useContext(chatContext);
  const { user, isAuthenticated, activeChatId } = context;
  const navigator = useNavigate();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: "You are not logged in",
        description: "Please login to continue",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      navigator("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      h="100%" // Set height to 100% of the viewport
      w="100%" // Set width to 100% of the viewport
      overflow="hidden" // Prevent scrollbars
    >
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
          w="100%"
        >
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      ) : (
        <Flex h="100%" w="100%">
          <Box
            w={{ base: "25%", md: "25%" }}
            h="100%"
            borderRightWidth="1px"
            overflowY="auto"
          >
            <Chats />
          </Box>
          <Box w={{ base: "60%", md: "75%" }} h="100%">
            <ChatArea />
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default Dashboard;
