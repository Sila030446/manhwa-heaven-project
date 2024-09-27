"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

export default function ScrapeQueue() {
  const [onGoingJob, setOnGoingJob] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await axios.get("https://api.nexamanga.online/job");
        if (!data) throw new Error("Network response was not ok");
        setOnGoingJob(data.data.onGoingJobsCount);
      } catch (error) {
        console.error("Error fetching data:", error);

        // SweetAlert for handling backend errors
        Swal.fire({
          icon: "error",
          title: "Server Error",
          text: "Failed to fetch data from the Server. Please try again later.",
          footer: `<a href="http://47.129.161.36/">Check Backend Server</a>`, // Optional link for debugging
        });
      }
    };

    // Fetch data every 3 seconds
    const interval = setInterval(() => getData(), 3000);

    // Cleanup on component unmount
    return () => clearInterval(interval);
  }, []);

  const onGoingJobColor = () => {
    if (onGoingJob <= 5) return "bg-green-500";
    else if (onGoingJob <= 10) return "bg-orange-500";
    else return "bg-red-500";
  };

  const onGoingJobTextColor = () => {
    if (onGoingJob <= 5) return "text-green-500";
    else if (onGoingJob <= 10) return "text-orange-500";
    else return "text-red-500";
  };

  return (
    <Card className="h-full shadow-lg rounded-lg border border-gray-200 dark:border-none">
      <CardHeader className="text-2xl font-semibold mb-5 flex items-center justify-center">
        <h1>Current Queue</h1>
      </CardHeader>
      <CardBody className="flex items-center justify-center">
        <div
          className={`h-52 w-52 rounded-full flex items-center justify-center ${onGoingJobColor()}`}
        >
          <div className="h-44 w-44 bg-white dark:bg-[#18181B] rounded-full flex items-center justify-center">
            <h4 className={`text-6xl font-bold ${onGoingJobTextColor()}`}>
              {onGoingJob}
            </h4>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
