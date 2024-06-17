import React, { useState, useEffect } from "react";
import { Wrapper, CatCard } from "../Components";
import ICT from "../assets/Ewaste_Category/ICT.jpg";
import LA from "../assets/Ewaste_Category/LA.jpg";
import SA from "../assets/Ewaste_Category/SA.jpg";
import { useContext } from "react";
import Context from "../context/Context";

const category1 = [
  {
    key: 1,
    name: "Information And Communication Equipment: ICT",
    image: ICT,
    items: [
      "Personal computers",
      "Laptops",
      "Monitors",
      "Keyboards",
      "Printers",
      "TV sets",
      "Video cameras",
    ],
  },
  {
    key: 2,
    name: "Large Household Appliances: Large HA",
    image: LA,
    items: [
      "Refrigerators",
      "Freezers",
      "Air conditioners",
      "Washing machines",
      "Clothes dryers",
      "Dish washing machines",
      "Electric stoves",
      "Microwave ovens",
      "Electric heating appliances",
      "Electric radiators",
      "Electric fans",
      "Electric space heaters",
      "Electric hot plates",
      "Electric toasters",
      "Electric coffee machines",
      "Electric fryers",
      "Electric grinders",
      "Electric food processors",
      "Electric knives",
      "Electric can openers",
      "Electric irons",
      "Electric shavers",
      "Electric water heaters",
      "Electric pumps",
      "Electric vacuum cleaners",
      "Electric sewing machines",
      "Electric massagers",
      "Electric lawn mowers",
      "Electric hedge trimmers",
      "Electric edge trimmers",
      "Electric chain saws",
      "Electric snow blowers",
      "Electric leaf blowers",
      "Electric snow shovels",
      "Electric snow plows",
      "Electric snow sweepers",
      "Electric snow throwers",
      "Electric snow melters",
      "Electric snow pushers",
      "Electric snow cutters",
      "Electric snow crushers",
      "Electric snow grinders",
      "Electric snow chippers",
      "Electric snow compactors",
      "Electric snow rollers",
      "Electric snow loaders",
      "Electric snow dozers",
    ],
  },
  {
    key: 3,
    name: "Small Household Appliances: Small HA",
    image: SA,
    items: [
      "Vacuum cleaners",
      "Carpet sweepers",
      "Floor polishers",
      "Kitchen waste disposers",
      "Food grinders",
      "Coffee grinders",
      "Electric knives",
      "Electric can openers",
      "Electric irons",
      "Electric shavers",
      "Electric tooth brushes",
      "Electric hair clippers",
      "Electric hair curlers",
      "Electric hair dryers",
      "Electric massagers",
      "Electric clocks",
      "Electric watches",
      "Electric calculators",
      "Electric scales",
      "Electric sewing machines",
      "Electric lawn mowers",
      "Electric hedge trimmers",
      "Electric edge trimmers",
      "Electric chain saws",
      "Electric snow blowers",
      "Electric leaf blowers",
      "Electric snow shovels",
      "Electric snow plows",
      "Electric snow sweepers",
      "Electric snow throwers",
      "Electric snow melters",
      "Electric snow pushers",
      "Electric snow cutters",
      "Electric snow crushers",
      "Electric snow grinders",
      "Electric snow chippers",
      "Electric snow compactors",
      "Electric snow rollers",
      "Electric snow loaders",
      "Electric snow dozers",
    ],
  },
  {
    key: 4,
    name: "Small Household Appliances: Small HA",
    image: SA,
    items: [
      "Vacuum cleaners",
      "Carpet sweepers",
      "Floor polishers",
      "Kitchen waste disposers",
      "Food grinders",
      "Coffee grinders",
      "Electric knives",
      "Electric can openers",
      "Electric irons",
      "Electric shavers",
      "Electric tooth brushes",
      "Electric hair clippers",
      "Electric hair curlers",
      "Electric hair dryers",
      "Electric massagers",
      "Electric clocks",
      "Electric watches",
      "Electric calculators",
      "Electric scales",
      "Electric sewing machines",
      "Electric lawn mowers",
      "Electric hedge trimmers",
      "Electric edge trimmers",
      "Electric chain saws",
      "Electric snow blowers",
      "Electric leaf blowers",
      "Electric snow shovels",
      "Electric snow plows",
      "Electric snow sweepers",
      "Electric snow throwers",
      "Electric snow melters",
      "Electric snow pushers",
      "Electric snow cutters",
      "Electric snow crushers",
      "Electric snow grinders",
      "Electric snow chippers",
      "Electric snow compactors",
      "Electric snow rollers",
      "Electric snow loaders",
      "Electric snow dozers",
    ],
  },
  {
    key: 5,
    name: "Small Household Appliances: Small HA",
    image: LA,
    items: [
      "Vacuum cleaners",
      "Carpet sweepers",
      "Floor polishers",
      "Kitchen waste disposers",
      "Food grinders",
      "Coffee grinders",
      "Electric knives",
      "Electric can openers",
      "Electric irons",
      "Electric shavers",
      "Electric tooth brushes",
      "Electric hair clippers",
      "Electric hair curlers",
      "Electric hair dryers",
      "Electric massagers",
      "Electric clocks",
      "Electric watches",
      "Electric calculators",
      "Electric scales",
      "Electric sewing machines",
      "Electric lawn mowers",
      "Electric hedge trimmers",
      "Electric edge trimmers",
      "Electric chain saws",
      "Electric snow blowers",
      "Electric leaf blowers",
      "Electric snow shovels",
      "Electric snow plows",
      "Electric snow sweepers",
      "Electric snow throwers",
      "Electric snow melters",
      "Electric snow pushers",
      "Electric snow cutters",
      "Electric snow crushers",
      "Electric snow grinders",
      "Electric snow chippers",
      "Electric snow compactors",
      "Electric snow rollers",
      "Electric snow loaders",
      "Electric snow dozers",
    ],
  },
];

const Explore = () => {
  const { User, category } = useContext(Context);
  const [deviceName, setDeviceName] = useState(""); // State variable for device name
  const [creditPoints, setCreditPoints] = useState(""); // State variable for credit points
  const [showForm, setShowForm] = useState(false);
  const [devices, setDevices] = useState([]); 

  console.log(User?.isAdmin);

  const fetchDevices = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/creditdevice");
      const data = await res.json();
      setDevices(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch devices data when component mounts
  useEffect(() => {
    fetchDevices();
  }, []);

 

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Make API call to create a credit device
      const res = await fetch("http://localhost:5000/api/users/creditdevice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceName, creditPoints }),
      });

      const data = await res.json();
      console.log(data);

      // Clear the form fields
      setDeviceName("");
      setCreditPoints("");

      alert("Credit Device Added Successfully");

      setShowForm(false);
    } catch (error) {
        alert("Credit Device Added Successfully");
        console.log(error);
    }
  };
  return (
    <Wrapper>
      <h1 className="mt-[5vh] font-montserrat font-bold text-2xl ">
        Select Your Category
      </h1>
      <div className="mt-[10vh] px-[5vw]">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-[5vh]">
          {category?.map((item) => (
            <CatCard
              image={item?.img}
              name={item?.category}
              key={item?._id}
              link={`/explore/${item?.category}`}
            />
          ))}
        </div>
      </div>
      <div>
        {User?.isAdmin && (
        <button
          className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowForm(true)}
        >
          Update Credit Device
        </button>

        )}
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Device Name:</label>
              <input
                type="text"
                value={deviceName}
                onChange={(e) => setDeviceName(e.target.value)}
              />
            </div>
            <div>
              <label>Credit Points:</label>
              <input
                type="text"
                value={creditPoints}
                onChange={(e) => setCreditPoints(e.target.value)}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Update Credit Devices
            </button>
          </form>
        )}
      </div>
      <div className="mt-10">
        <h2 className="font-bold text-xl mb-4 text-white">Devices and Credit Points</h2>
        <table className="min-w-full divide-y divide-gray-200 bg-gray-800 text-white">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Serial No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Device Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Credit Points
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {devices.map((device, index) => (
              <tr key={device._id}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.deviceName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{device.creditPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

export default Explore;
