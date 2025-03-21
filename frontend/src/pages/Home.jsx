import React from "react";
import Hero from "../components/Hero";
import Featured from "../components/Featured";
import CallAction from "../components/CallAction";
import { useLoaderData } from "react-router-dom";
import TestCard from "../components/TestCard";

const Home = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);

  return (
    <div>
      <Hero />
      {/* <Featured />
      <CallAction /> */}
    </div>
  );
};

export default Home;
