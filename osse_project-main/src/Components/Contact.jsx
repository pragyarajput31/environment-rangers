import React, { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const contactForm = async () => {
    if (email === "" || name === "" || description === "") {
      alert("Please fill all the fields");
    } else {
      try {
        const res = await fetch("http://localhost:5000/api/users/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, name, description }),
        });

        const data = await res.json();
        console.log(data);
        alert("Your query has been submitted");

        // Clear form fields
        setEmail("");
        setName("");
        setDescription("");
      } catch (error) {
        alert("Internal Server Error");
      }
    }
  };

  return (
    <div id="contact">
      <div className="flex flex-col justify-center items-center mt-[20vh]">
        <h1 className="mb-[10vh] font-montserrat font-bold text-2xl">
          Contact Us
        </h1>
        <div className="w-fit h-fit bg-[#343434] shadow-3xl rounded-xl p-[5vh] md:ml-5 mb-10 z-10 searchtext card">
          <h1 className="md:text-[5vh] text-[8vh] font-montserrat font-bold">
            Contact our Team
          </h1>
          <p className="text-gray-400 text-lg font-montserrat font-medium">
            Fill up the details given below and click on submit
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <div className="md:flex md:gap-5">
              <div className="relative">
                <p className="font-montserrat font-semibold">Email</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 rounded-lg p-4 font-montserrat border-2 font-medium bg-[#222222]"
                  placeholder="Enter Your Email"
                />
              </div>
              <div className="relative">
                <p className="font-poppins font-semibold md:mt-0 mt-5">Name</p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 rounded-lg text-[#F9F6EE] p-4 font-montserrat border-2 font-medium bg-[#222222]"
                  placeholder="Enter Your Name"
                />
              </div>
            </div>
            <div className="relative">
              <p className="font-poppins font-semibold md:mt-0 mt-5">Description</p>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mt-2 rounded-lg text-[#F9F6EE] p-4 font-montserrat border-2 font-medium bg-[#222222]"
                placeholder="Enter Your Description"
              />
            </div>
            <button
              className="hover:bg-[#01796f] mt-[2vh] hover:scale-105 shadow-3xl transition-transform font-montserrat font-semibold p-4 rounded-lg w-fit"
              onClick={contactForm}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
