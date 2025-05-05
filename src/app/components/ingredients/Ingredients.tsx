"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { MeasureData } from "@/type";
import { ingredientsService } from "@/lib/services/ingredientsService";
import { formatDate } from "@/app/utils/formatDate";
import { Colors } from "@/Constant/Colors";

export const IngredientsClient = () => {
  const [measureData, setMeasureData] = useState<MeasureData[]>([]);
  const [name, setName] = useState("");
  const [shortForm, setShortForm] = useState("");

  useEffect(() => {
    fetchMeasure();
  }, []);

  const fetchMeasure = async () => {
    try {
      const response = await ingredientsService.getMeasure();
      console.log(response);
      if (response.statusCode == 200) {
        setMeasureData(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddMeasure = async() =>{
    console.log('add');
    
    try {
        const body = {
            name,
            short_form:shortForm
        }
         await ingredientsService.addMeasure(body)
    } catch (error) {
        console.error(error);
        
    }
  }
  return (
    <div className="bg-white h-screen">
      <Navbar />
      <div className="flex flex-row m-10  border border-white p-3 rounded-md shadow-md ">
        <input
          style={{ color: Colors.primary}}
          placeholder={"ingredient name"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-150 border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white mr-5"
          required
        />
        <input
          style={{ color: Colors.primary }}
          placeholder={"short_form"}
          value={shortForm}
          onChange={(e) => setShortForm(e.target.value)}
          className="w-150 border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white"
          required
        />
        <button
          style={{ backgroundColor: Colors.primary }}
          className="bg-[#03af00] text-white p-2 w-[75px] rounded-[10px]"
          onClick={()=>handleAddMeasure()}
        >
          {"add"}
        </button>
      </div>
      <table className="min-w-full bg-orangeCustom border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-black">ID</th>
            <th className="py-2 px-4 border-b text-black">Name</th>
            <th className="py-2 px-4 border-b text-black">{"Short Form"}</th>
            <th className="py-2 px-4 border-b text-black">{"create at"}</th>

            <th className="py-2 px-4 border-b text-black">{"Update at"}</th>
            <th className="py-2 px-4 border-b text-black">{"Edit"}</th>
            <th className="py-2 px-4 border-b text-black">{"Delete"}</th>
          </tr>
        </thead>
        <tbody>
          {measureData.map((items, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b text-black text-center">
                {items.id}
              </td>
              <td className="py-2 px-4 border-b text-black text-center">
                {items.name}
              </td>
              <td className="py-2 px-4 border-b text-black text-center">
                {items.short_forn}
              </td>
              <td className="py-2 px-4 border-b text-black text-center">
                {formatDate(items.createAt)}
              </td>
              <td className="py-2 px-4 border-b text-black text-center">
                {formatDate(items.updateAt)}
              </td>
              <td className="py-2 px-4 border-b text-black text-center">
                <button className="bg-[#03af00] text-white p-2 w-[75px] rounded-[10px]">
                  {"edit"}
                </button>
              </td>
              <td className="py-2 px-4 border-b text-black text-center">
                <button className="bg-[#a11818] text-white p-2 w-[75px] rounded-[10px]">
                  {"delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
