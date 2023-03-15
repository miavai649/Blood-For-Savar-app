import { Heading } from '@chakra-ui/react'
import React from 'react'
import DonorForm from '../components/DonorForm'

function Home() {
  return (
      <div>
          <Heading textAlign={"center"} mt="90px" as={"h1"} size="2xl">
        🩸Blood Donor List
      </Heading>

      {/* form */}
      <DonorForm></DonorForm>
    </div>
  )
}

export default Home