import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel, Input,
    Select
} from "@chakra-ui/react";
import React from 'react';

function DonorForm() {

    const handleAddDonor = e => {
        e.preventDefault()
        const form = e.target
        const donorData = {
            name: form.name.value,
            email: form.email.value,
            phoneNum: form.phoneNum.value,
            bloodGrp: form.bloodGrp.value
        }
        console.log(donorData);

        fetch('http://localhost:5000/donor', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(donorData)
        })
        .then(res => res.json())
            .then(data => {
                console.log(data)
                form.reset()
        })

    }

  return (
    <Container border={'1px'} p='40px' borderRadius={'md'} size={"container.xl"} mt={"60px"}>
        <form onSubmit={handleAddDonor}>
          <FormControl isRequired mb={"20px"}>
            <FormLabel>Donor Name:</FormLabel>
            <Input type="text" name="name" placeholder="Enter your name" />
          </FormControl>
          <FormControl mb={"20px"}>
            <FormLabel>Donor Email</FormLabel>
            <Input type="email" name="email" placeholder="Enter your email" />
          </FormControl>
          <Flex gap={'50px'}>
            <FormControl isRequired mb={"20px"}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                name="phoneNum"
                
              />
            </FormControl>
            <FormControl isRequired mb={"20px"}>
              <FormLabel >Blood Group</FormLabel>
              <Select  name="bloodGrp">
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </Select>
            </FormControl>
          </Flex>
          <Button w={"full"} type="submit" colorScheme={"red"}>
            Submit
          </Button>
        </form>
      </Container>
  )
}

export default DonorForm