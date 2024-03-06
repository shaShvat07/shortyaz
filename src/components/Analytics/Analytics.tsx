import React from "react";
import Navbar2 from "../Navbar2/Navbar2";
import { useState, useEffect } from "react";
import { useStateValue } from "../../MyContexts/StateProvider";
import instance from "../../axios";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [{ token }, dispatch] = useStateValue();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await instance.get("/api/getAnalytics", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // console.log(response.data.analytics);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };
    getData();
  }, [token]);
  return (
    <div className="bg-elite-black text-white min-h-screen">
      <Navbar2 />

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-center text-5xl font-bold mb-12">Analytics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-500 = text-white rounded-lg p-6 h-[250px]">
            <h3 className="text-6xl text-center font-bold mb-2">{data?.websites}</h3>
            <p className="text-3xl text-center p-5">Total Url Shortened</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-6">
            <h3 className="text-6xl text-center font-bold mb-2">{data?.clicks}</h3>
            <p className="text-3xl text-center p-5">Total Clicks</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-6">
            <h3 className="text-6xl text-center font-bold mb-2">{data?.active}</h3>
            <p className="text-3xl text-center p-5">Active Links</p>
          </div>
          <div className="bg-red-500 text-white rounded-lg p-6">
            <h3 className="text-6xl text-center font-bold mb-2">{data?.active}</h3>
            <p className="text-3xl text-center p-5">Inactive Links</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
