import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Retrieve = () => {
  const [uniqueId, setUniqueId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://online-clipboard-nine.vercel.app/api/data/${uniqueId}`
      );
      setData(response.data);
    } catch (error) {
      setError("Error retrieving data");
    }
  };

  return (
    <Container>
      <div>
        <div>
          <h3>
            <i>Send data to Clipboard</i> &nbsp;
            <Link to="/" className="btn btn-primary">
              <i>Click Here</i>
            </Link>
          </h3>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <form onSubmit={handleSubmit}>
          <h3>
            <i>Retrieve your data.</i>
          </h3>
          <input
            className="form-control"
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            placeholder="Enter Retrieval ID"
            required
          />
          <br></br>

          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
        <br></br>
        <br></br>
        {data && (
          <div>
            {/* Display the retrieved data here */}
            <p>
              <b>
                Information Retrieved: <br></br>{" "}
              </b>{" "}
              {data.data}
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Retrieve;

const Container = styled.div`
  button {
    border-radius: 13px;
    background: #254799;
    box-shadow: 35px 35px 70px #696969, -35px -35px 70px #ffffff;
  }
  h3 Link {
    border-radius: 13px;
    background: #254799;
    box-shadow: 35px 35px 70px #696969, -35px -35px 70px #ffffff;
  }
`;
