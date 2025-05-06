"use client";

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { MeasureData } from "@/type";
import { ingredientsService } from "@/lib/services/ingredientsService";
import { formatDate } from "@/app/utils/formatDate";
import { Colors } from "@/Constant/Colors";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";

export const IngredientsClient = () => {
  const { t } = useTranslation();

  const [measureData, setMeasureData] = useState<MeasureData[]>([]);
  const [name, setName] = useState("");
  const [shortForm, setShortForm] = useState("");
  const [nameEdit, setNameEdit] = useState("");
  const [shortFormEdit, setShortFormEdit] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [updateSelect, setUpdateSelect] = useState<number>(0);

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

  const handleAddMeasure = async () => {
    try {
      const body = {
        name,
        short_form: shortForm,
      };
      await ingredientsService.addMeasure(body);
      fetchMeasure();
      setName("");
      setShortForm("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMeasure = async (id: number) => {
    try {
      const response = await ingredientsService.delMeasure(id);
      if (response.statusCode == 200) {
        fetchMeasure();
      }
    } catch (error) {}
  };

  const handleShowModal = (id: number) => {
    const data = measureData.find((item) => item.id == id);
    setShowModal(true);
    setUpdateSelect(id);
    setNameEdit(data?.name ?? "");
    setShortFormEdit(data?.short_forn ?? "");
  };

  const handleUpdate = async () => {
    try {
      const body = {
        name: nameEdit,
        short_form: shortFormEdit,
      };
      const response = await ingredientsService.updateMeasure(
        updateSelect,
        body
      );
      if (response.statusCode == 200) {
        setShowModal(false);
        fetchMeasure();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-white h-screen">
      <Navbar />
      <div className="m-10">
        <h3 style={{ color: Colors.primary }} className="text-white">
          Add Measure
        </h3>
        <div className="flex flex-row rounded-md">
          <input
            style={{ color: Colors.white, backgroundColor: Colors.primary }}
            placeholder={t("measure_name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-150 border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white mr-5"
            required
          />
          <input
            style={{ color: Colors.white, backgroundColor: Colors.primary }}
            placeholder={t("short_form")}
            value={shortForm}
            onChange={(e) => setShortForm(e.target.value)}
            className="w-150 border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white"
            required
          />
          <button
            style={{ backgroundColor: Colors.primary, color: Colors.white }}
            className="bg-[#03af00]  p-2 w-[75px] rounded-[10px] ml-5"
            onClick={() => handleAddMeasure()}
          >
            {t("add")}
          </button>
        </div>
      </div>
      <div className="mx-10 w-200">
        <h3 className="text-black">Search</h3>
        <div className="flex flex-row border border-white ">
          <input
            style={{ color: Colors.primary }}
            placeholder={t("search")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-150 border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white "
            required
          />

          <button
            style={{ backgroundColor: Colors.primary }}
            className="bg-[#03af00] text-white p-2 w-[75px] rounded-[10px] ml-5"
            onClick={() => handleAddMeasure()}
          >
            {t("search")}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto mx-10 mt-2">
        <table className="min-w-full bg-orangeCustom border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-black">ID</th>
              <th className="py-2 px-4 border-b text-black">
                {t("measure_name")}
              </th>
              <th className="py-2 px-4 border-b text-black">
                {t("short_form")}
              </th>
              <th className="hidden md:table-cell py-2 px-4 border-b text-black">{"create at"}</th>

              <th className=" hidden md:table-cell py-2 px-4 border-b text-black">{"Update at"}</th>
              <th className="py-2 px-4 border-b text-black">{t("edit")}</th>
              <th className="py-2 px-4 border-b text-black">{t("delete")}</th>
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
                <td className="hidden md:table-cell py-2 px-4 border-b text-black text-center">
                  {formatDate(items.createAt)}
                </td>
                <td className="hidden md:table-cell py-2 px-4 border-b text-black text-center">
                  {formatDate(items.updateAt)}
                </td>
                <td className="py-2 px-4 border-b text-black text-center">
                  <button
                    className="bg-[#03af00] text-white p-2 w-[75px] rounded-[10px]"
                    onClick={() => handleShowModal(items.id)}
                  >
                    {t("edit")}
                  </button>
                </td>
                <td className="py-2 px-4 border-b text-black text-center">
                  <button
                    className="bg-[#a11818] text-white p-2 w-[75px] rounded-[10px]"
                    onClick={() => {
                      handleDeleteMeasure(items.id);
                    }}
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div>
          <input
            style={{ color: Colors.primary }}
            placeholder={t("measure_name")}
            value={nameEdit}
            onChange={(e) => setNameEdit(e.target.value)}
            className="w-full border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white mr-5"
            required
          />
          <input
            style={{ color: Colors.primary }}
            placeholder={t("short_form")}
            value={shortFormEdit}
            onChange={(e) => setShortFormEdit(e.target.value)}
            className="w-full border border-white p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white color-white"
            required
          />
          <div className="flex flex-row justify-between">
            <button
              // style={{backgroundColor:Colors.primary}}
              onClick={() => handleUpdate()}
              className="bg-[#03af00] text-white px-4 py-2 rounded mt-10"
            >
              Confirm
            </button>
            <button
              style={{ backgroundColor: Colors.primary }}
              onClick={() => setShowModal(false)}
              className="text-white px-4 py-2 rounded mt-10"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
