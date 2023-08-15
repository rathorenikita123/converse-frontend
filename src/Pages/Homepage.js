import React, { useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      navigate("/chats");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent justifyContent="center">
      <Card
        maxW="xl"
        backgroundColor={"rgba(255, 255, 255, 0.1)"}
        backdropFilter="blur(10px)"
        border="1px solid rgba(255, 255, 255, 0.125)"
        borderRadius="lg"
      >
        <CardBody>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            display="flex"
            flexDirection="column"
          >
            <Text fontSize="4xl" color={"#73BBC9"}>
              Enter with a smile, leave with amazing chats
            </Text>
            <TabList justifyContent="center">
              <Tab color={"#64CCC5"}>Login</Tab>
              <Tab color={"#64CCC5"}>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Home;
