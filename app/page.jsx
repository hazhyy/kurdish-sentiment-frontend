"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Circle } from "lucide-react";

import { SelectModel } from "@/components/ui/SelectModel";
import { fetchResponse, fetchScore } from "@/lib/requests";
import PieChart from "@/components/PieChart";
import useSWR from "swr";
const page = () => {
  const [textAreaValue, setTextAreaValue] = useState("");
  const [query, setQuery] = useState({ text: "تێست", model: "lr" });
  console.log("qu", query);
  const { data, error } = useSWR(
    [query, "labelsResult"],
    () => fetchResponse(query),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  const { data: score, error: scoreError } = useSWR(
    [query, "scoreResult"],
    () => fetchScore(query),
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateOnReconnect: false,
      refreshWhenOffline: false,
      refreshWhenHidden: false,
      refreshInterval: 0,
    }
  );

  const [pieData, setPieData] = useState({
    labels: data?.labeled_prediction_by_word?.map((item) => item.sentiment),
    datasets: [
      {
        label: "words",
        data: data?.labeled_prediction_by_word?.map(
          (item) => item.prediction_class
        ),
      },
    ],
  });

  useEffect(() => {
    if (data?.labeled_prediction_by_word) {
      // Aggregate and count sentiment values
      const sentimentCounts = data.labeled_prediction_by_word.reduce(
        (acc, item) => {
          const sentiment = item.sentiment; // Use sentiment as the key
          acc[sentiment] = (acc[sentiment] || 0) + 1;
          return acc;
        },
        {}
      );
      const labels = Object.keys(sentimentCounts);
      const chartData = Object.values(sentimentCounts);
      setPieData({
        labels: labels,
        datasets: [
          {
            label: "Sentiment Classes",
            data: chartData,
            backgroundColor: [
              "#e8e8e8",
              "#b7b7b7",
              "#7d7d7d",
              "#3e3e3e",
              "rgb(153, 102, 255)",
              "rgb(255, 159, 64)",
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 206, 86)",
              "rgb(75, 192, 192)",
              "rgb(153, 102, 255)",
            ],
          },
        ],
      });
    }
  }, [data]);

  console.log(score);

  let isPositive = "ئاسایی";
  let isPositiveBg = "bg-gray-600";
  if (score) {
    if (score?.score > 3) {
      isPositive = "ئەرێنی";
      isPositiveBg = "bg-green-600";
    } else if (score?.score < 3) {
      isPositive = "نەرێنی";
      isPositiveBg = "bg-red-600";
    } else {
      isPositive = "ئاسایی";
      isPositiveBg = "bg-gray-600";
    }
  }
  return (
    <div className="w-full h-screen text-right">
      <div className="flex flex-col w-full h-full p-4 md:flex-row-reverse ">
        <div className="flex flex-col items-end w-full gap-4 rounded-md">
          <textarea
            name="textArea"
            placeholder="...شتێک بنووسە بۆ بەردەوام بوون"
            onChange={(e) => {
              setTextAreaValue(e.target.value);
            }}
            className="w-full h-40 p-4 text-right bg-black border border-white rounded-lg border-opacity-10 md:h-5/6 bg-none"
          ></textarea>
          <div className="flex gap-2">
            {data && <p>{data.labeled_sentiment}</p>}
            <p className={`px-2 rounded-md ${isPositiveBg}`}>{isPositive}</p>
          </div>
          <Button
            variant="default"
            className="w-20"
            onClick={() => {
              setQuery({ text: textAreaValue, model: "rf" });
            }}
          >
            ناردن
          </Button>
        </div>
        <div className="px-4 mt-4 space-y-4 md:w-96 md:mt-2 ">
          {/* <ComboboxDemo /> */}
          <div className="justify-center w-full space-y-2 text-center">
            <SelectModel />

            <p>نمرە</p>
            <div className="flex flex-row-reverse items-center justify-center w-full gap-2">
              <p className="text-xs">نەرێنی</p>
              {[...Array(5)].map((_, index) => (
                <Circle
                  className={`transition-all ${
                    index < score?.score ? "fill-white" : ""
                  }`}
                  key={index}
                />
              ))}
              <p className="text-xs">ئەرێنی</p>
            </div>
          </div>

          <div className="justify-center w-full space-y-2 text-center">
            <p className="font-bold">جۆری هەست</p>
            {data ? <p>{data.labeled_sentiment}</p> : <p>سەرەتا شتێک بنووسە</p>}
          </div>
          <div className="justify-center w-full space-y-2 text-center">
            {data?.labeled_prediction_by_word && (
              <p className="font-bold">هەستەکان بە پێی وشە</p>
            )}
            <div className="flex flex-wrap justify-center w-full gap-2 text-sm text-center">
              {data?.labeled_prediction_by_word.map((words) => (
                <p key={words.word}>
                  {words.word}: {words.sentiment}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-center w-full">
            <PieChart chartData={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
