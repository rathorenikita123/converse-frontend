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
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import theme from "../../extend";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    pic: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isPasswordValid = (password) => {
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    return passwordPattern.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isEmailValid(form.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (!isPasswordValid(form.password)) {
      toast({
        title: "Invalid Password",
        description:
          "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.passwordConfirm ||
      !pic
    ) {
      toast({
        title: "Invalid Credentials",
        description: "Please fill all the fields",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (form.password !== form.passwordConfirm) {
      toast({
        title: "Invalid Credentials",
        description: "Passwords do not match",
        status: "error",
        duration: 6000,
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
        "/api/user",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          profileImage: pic,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      toast({
        title: "Account Created",
        description: "Your account has been created successfully",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setForm({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        pic: "",
      });

      navigate("/");
    } catch (error) {
      toast({
        title: "Invalid Credentials",
        description: "Something went wrong. Please try again later.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "drdiolqac");
      fetch("https://api.cloudinary.com/v1_1/drdiolqac/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing={4} align="stretch" theme={theme}>
      <FormControl p={2}>
        <FormLabel color={"#FBFFDC"} fontWeight={600}>
          Email address
        </FormLabel>
        <Input
          color={"#FEFF86"}
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl p={2}>
        <FormLabel color={"#FBFFDC"} fontWeight={600}>
          Name
        </FormLabel>
        <Input
          color={"#FEFF86"}
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl p={2}>
        <FormLabel color={"#FBFFDC"} fontWeight={600}>
          Password
        </FormLabel>
        <InputGroup>
          <Input
            color={"#FEFF86"}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Passwordtht"
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
      <FormControl p={2}>
        <FormLabel color="#FBFFDC" fontWeight={600}>
          Confirm Password
        </FormLabel>
        <InputGroup>
          <Input
            color="#FEFF86"
            type={showPassword ? "text" : "password"}
            name="passwordConfirm"
            placeholder="Confirm Your Password"
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
      <FormControl p={2}>
        <FormLabel color="#FBFFDC" fontWeight={600}>
          Profile Picture
        </FormLabel>
        <Input
          color="#FEFF86"
          type="file"
          name="pic"
          placeholder="Upload Your Profile Picture"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Divider my={2} />
      <Button
        colorScheme="teal"
        size="lg"
        isLoading={loading}
        onClick={handleSubmit}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </Button>
    </VStack>
  );
};

export default Signup;
