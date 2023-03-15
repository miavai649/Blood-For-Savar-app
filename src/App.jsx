import {
  Heading
} from "@chakra-ui/react";
import "./App.css";
import DonorForm from "./components/DonorForm";

function App() {

  

  return (
    <div className="App">
      <Heading textAlign={"center"} mt="90px" as={"h1"} size="2xl">
        🩸Blood Donor List
      </Heading>

      {/* form */}
      <DonorForm></DonorForm>
    </div>
  );
}

export default App;
