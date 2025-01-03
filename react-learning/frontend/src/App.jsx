import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Form = () => {
  const [formdata, setformdata] = useState({
    fname: "firstname",
    lname: "lastname",
    email: "email@gmail.com",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setformdata({
      fname: e.target.elements.fname.value,
      lname: e.target.elements.lname.value,
      email: e.target.elements.email.value,
    });
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:3000/verify",
          formdata
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [formdata]);

  return (
    <>
      <div>
        <h1>Form</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>First Name : </label>
            <input type="text" placeholder="First Name" name="fname" />
            <br />
            <br /> <label>Last Name : </label>
            <input type="text" placeholder="Last Name" name="lname" />
            <br />
            <br /> <label>Email : </label>
            <input type="text" placeholder="Email" name="email" />
            <br />
            <br /> <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
