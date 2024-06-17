import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../context/Context";

const CatCard = ({ image, name, link, cardid }) => {
  const navigate = useNavigate();
  const { setiscartupdated, iscartupdated } = useContext(Context);

  const credit = localStorage.getItem("credit");

  const onSubmit = async () => {
    !localStorage.getItem("user")
      ? () => navigate("/login")
      : () => addtocart();

      alert("This item contains non environment friendly materials. Please recycle it properly");
      const updatedCredit = parseInt(credit) + 10;
      localStorage.setItem("credit", updatedCredit);
      alert("You got 10 points for recycling this item");

      window.location.reload();
  };

  const addtocart = async () => {
    console.log(cardid, localStorage.getItem("user"));
    try {
      const response = await fetch(
        "https://ewfl-backend-hemant2335.vercel.app/user/updatecartdata",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartId: cardid,
            quantity: 1,
            userId: localStorage.getItem("user"),
          }),
        }
      );

      const data = await response.json();

      if (data?.message == "Cart updated successfully") {
        setiscartupdated(!iscartupdated);
        navigate("/cart");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="md:max-w-[20vw]  shadow-3xl p-4 rounded-xl flex flex-col  gap-[2vh] cursor-pointer hover:scale-105 transition-transform hover:bg-[#01796f]"
      onClick={() => {
        link != "#" ? navigate(link) : "";
      }}
    >
      <div className="w-full max-h-[25vh] flex z-10">
        <img src={image} alt="" className=" object-cover rounded-xl " />
      </div>
      <h1 className="text-md font-montserrat font-bold">{name}</h1>
      {link == "#" ? (
        <button
          className="shadow-3xl font-medium border-2 font-poppins px-4 py-2 bg-[#222222] rounded-md hover:bg-red-400  transition-transform nav"
          onClick={onSubmit}
        >
          Recycyle Now
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default CatCard;
