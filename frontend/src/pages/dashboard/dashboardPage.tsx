"use client";

import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import MenuCards from "./components/MenuCards";
import { MdOutlineToday } from "react-icons/md";
import { HiCalendarDays } from "react-icons/hi2";
import { RiFoldersFill } from "react-icons/ri";
import { AiOutlineCheck } from "react-icons/ai";
import { useAppSelector } from "../../app/hooks";

const DashboardPage = () => {
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <PageHeader isButtonHidden title="Dashboard" />
      <div className="mt-10 flex flex-col gap-2">
        <h1 className="font-bold text-xl text-neutral-800">Good Morning</h1>
        <h1 className="font-bold text-xl">Narayan Thapa</h1>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-5 ">
        <MenuCards
          icon={MdOutlineToday}
          label="Today"
          onClick={() => navigate("/dashboard/today")}
        />
        <MenuCards icon={HiCalendarDays} label="Scheduled" onClick={() => {}} />
        <MenuCards icon={RiFoldersFill} label="All" onClick={() => {}} />
        <MenuCards icon={AiOutlineCheck} label="Completed" onClick={() => {}} />
      </div>

      {/* <MenuCards
                icon={MdOutlineToday}
                label="Completed"
                onClick={() => {}}
              /> */}
    </>
  );
};

export default DashboardPage;
