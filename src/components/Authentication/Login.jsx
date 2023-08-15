import React, { useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormLabel,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../../extend";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const { setUser } = ChatState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!form.email || !form.password) {
      toast({
        title: "Invalid Credentials",
        description: "Please fill all the fields",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        {
          email: form.email,
          password: form.password,
        },
        config
      );
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);

      navigate("/chats");
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        description: "Invalid email or password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch" theme={theme}>
      <FormControl p={2}>
        <FormLabel color="#FBFFDC" fontWeight={600}>
          Email address
        </FormLabel>
        <Input
          color="#FEFF86"
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter Your Email"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl p={2}>
        <FormLabel color="#FBFFDC" fontWeight={600}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            color="#FEFF86"
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            placeholder="Enter Your Password"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Divider my={2} />
      <Button colorScheme="teal" size="lg" onClick={handleSubmit} mb={2}>
        {loading ? "Logging in..." : "Login"}
      </Button>
      <Button
        colorScheme="teal"
        size="lg"
        onClick={() => {
          setForm({
            email: "abc@gmail.com",
            password: "123456",
          });
        }}
      >
        Guest Login
      </Button>
    </VStack>
  );
};

export default Login;
