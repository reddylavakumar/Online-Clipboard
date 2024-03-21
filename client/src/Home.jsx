import { useState } from "react";
import axios from "axios";
import Retrieve from "./Retrieve";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Home() {
  const [data, setData] = useState("");
  const [uniid, setUniid] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  axios.default.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsVisible(true);

    try {
      const generatedNumber = await generateUniqueNumber(); // Generates unique ID
      setUniid(generatedNumber);

      const response = await axios.post("https:/online-clipboard-nine.vercel.app/", {
        data,
        uniid: generatedNumber,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error registering data:", error);
    }
  };

  const generateUniqueNumber = async () => {
    let generatedNumber;
    do {
      generatedNumber = Math.floor(1000 + Math.random() * 9000);
    } while (await checkUniqueIdExists(generatedNumber)); // Checks if ID exists
    return generatedNumber;
  };

  const checkUniqueIdExists = async (generatedNumber) => {
    try {
      const response = await axios.get(
        `https://online-clipboard-api.vercel.app/api/data/${generatedNumber}`
      );
      return response.data !== null; // Return true if ID exists already
    } catch (error) {
      console.error("Error checking unique ID:", error);
      return false;
    }
  };

  return (
    <Container>
      <div>
        <div>
          <h3>
            <i>Already have a code and Wanna Retrieve</i> &nbsp;
            <Link to="/retrieve" className="btn btn-primary">
              &nbsp;<i>Retrieve</i>
            </Link>
          </h3>
        </div>
        <br />
        <br />
        <br />
        <br />
        <h3>
          <i>
            Please enter the information you'd like to send to the clipboard.
          </i>
        </h3>
        <form onSubmit={handleSubmit}>
          <textarea
            type="text"
            className="form-control"
            placeholder="Enter your text here"
            autoComplete="off"
            name="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          <br />
          <button className="btn btn-primary" type="submit">
            Send to clipboard
          </button>
        </form>
        <br />
        {isVisible && <h4>Your retrieval id is : {uniid}</h4>}
      </div>
    </Container>
  );
}

export default Home;

const Container = styled.div`
  button {
    border-radius: 13px;
    background: #254799;
    box-shadow: 35px 35px 70px #696969, -35px -35px 70px #ffffff;
  }
`;
