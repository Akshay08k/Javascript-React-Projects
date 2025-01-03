import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
  const data = useLoaderData();
  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg shadow-lg space-y-4  mt-10">
      <h1 className="text-4xl font-bold">Github Profile</h1>
      <img
        src={data.avatar_url}
        alt="Git picture"
        className="rounded-full border-4 border-white shadow-lg w-48 h-48"
      />
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">
          {data.name || "No Name Provided"}
        </h2>
        <p className="text-lg italic">
          {data.location || "Location not available"}
        </p>
        <p className="text-gray-400">{data.bio || "Bio not available"}</p>
      </div>
      <div className="text-lg font-medium bg-gray-700 px-4 py-2 rounded-full hover:bg-gray-600 transition">
        Followers: {data.followers}
      </div>
    </div>
  );
}

export default Github;

export const githubInfoLoader = async () => {
  const response = await fetch("https://api.github.com/users/akshay08k");
  return response.json();
};
