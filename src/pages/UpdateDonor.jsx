import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel, Heading, Input,
    Select
} from "@chakra-ui/react";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

function UpdateDonor() {
    const router = useParams()
    const { id } = router;
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [donor, setDonor] = useState([])

    useEffect(() => {
        fetch(`https://donor-list-server.vercel.app/donor/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0]);
            setDonor(data[0])
        })
    },[id])

    const handleUpdateDonor = e => {
        setIsLoading(true)
        e.preventDefault()
        const form = e.target
        const updatedDonor = {
            name: form.name.value,
            email: form.email.value,
            phoneNum: form.phoneNum.value,
            bloodGrp: form.bloodGrp.value
        }
        fetch(`https://donor-list-server.vercel.app/update/${id}`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(updatedDonor)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setIsLoading(false)
            navigate('/')
            toast.success('Donor details successfully updated')
        })
    }

  return (
      <Container border={'1px'} p='40px' borderRadius={'md'} size={"container.xl"} mt={"60px"}>
        <Heading mb={'30px'}>Update Donor Details</Heading>
        <form onSubmit={handleUpdateDonor}>
          <FormControl isRequired mb={"20px"}>
            <FormLabel>Donor Name:</FormLabel>
            <Input type="text" defaultValue={donor.name} name="name" placeholder="Enter your name" />
          </FormControl>
          <FormControl mb={"20px"}>
            <FormLabel>Donor Email</FormLabel>
            <Input type="email" defaultValue={donor.email} name="email" placeholder="Enter your email" />
          </FormControl>
          <Flex gap={'50px'}>
            <FormControl isRequired mb={"20px"}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                defaultValue={donor.phoneNum}
                name="phoneNum"
                
              />
            </FormControl>
            <FormControl isRequired mb={"20px"}>
              <FormLabel >Blood Group</FormLabel>
              <Select name="bloodGrp">
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
         <Flex justifyContent={"space-between"}>
         {
            isLoading ? <Button isLoading
            loadingText='Submitting'  type="submit" colorScheme={"red"}>
                    Submit
                  </Button> : 
                      <Button  type="submit" colorScheme={"red"}>
                             <CheckIcon/>
                            </Button>
          }
          <Link to={'/'}><Button  colorScheme={"red"}>
                             <CloseIcon/>
                            </Button></Link>
          
         </Flex>
        </form>
      </Container>
  )
}

export default UpdateDonor