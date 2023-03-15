import { DeleteIcon } from '@chakra-ui/icons';
import {
    Button,
    Container,
    Flex,
    FormControl,
    FormLabel, Input,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaArrowAltCircleUp } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

function DonorForm() {

    const [isLoading, setIsLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [donors, setDonors] = useState([]);
    const navigate = useNavigate()

    const handleAddDonor = e => {
        setIsLoading(true)
        e.preventDefault()
        const form = e.target
        const donorData = {
            name: form.name.value,
            email: form.email.value,
            phoneNum: form.phoneNum.value,
            bloodGrp: form.bloodGrp.value
        }
        console.log(donorData);

        fetch('https://donor-list-server.vercel.app/donor', {
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
                setIsLoading(false)
                toast.success('Donor added successfully') 
                
        })

    }

    

  useEffect(() => {
    fetch("https://donor-list-server.vercel.app/allDonor")
      .then((res) => res.json())
        .then((data) => {
            setDonors(data)
            setRefresh(!refresh)
      });
  }, [refresh]);
    
    const handleUpdate = (id) => {
        navigate(`/updateDonor/${id}`)
    }

    const handleDelete = (id) => {
        const proceed = window.confirm('Donor will be delete')
        if (proceed) {
            fetch(`https://donor-list-server.vercel.app/deleteDonor/${id}`, {
                method: 'DELETE'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                   toast.error('Donor deleted') 
                   const remaining = donors.filter(donor => donor._id !== id)
                   setDonors(remaining)
                }
            })
        }
    }

    return (
      <div>
          <Container border={'1px'} p='40px' borderRadius={'md'} size={"container.xl"} mt={"60px"}>

            {/* donor form */}
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
          {
            isLoading ? <Button isLoading
            loadingText='Submitting' w={"full"} type="submit" colorScheme={"red"}>
                    Submit
                  </Button> : 
                      <Button w={"full"} type="submit" colorScheme={"red"}>
                              Submit
                            </Button>
          }
        </form>
      </Container>

      {/* donor details table */}
      <TableContainer border={"1px"} size="md" mx="60" my={'90px'}>
      <Table >
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Contact Number</Th>
            <Th>Blood Group</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {donors.map((donor, i) => (
            <Tr key={donor._id}>
              <Td>{i + 1}</Td>
              <Td>{donor.name}</Td>
              <Td>{donor.email}</Td>
              <Td>{donor.phoneNum}</Td>
              <Td>{donor.bloodGrp}</Td>
              <Td>
                <Button onClick={() => handleUpdate(donor._id)} colorScheme="blue" size="xs">
                  <FaArrowAltCircleUp/> Update
                </Button>
              </Td>
              <Td>
                <Button onClick={() => handleDelete(donor._id)} colorScheme="red" size="xs">
                <DeleteIcon/> Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>  
      </div>
    
  )
}

export default DonorForm