import Image from "next/image";
import { FaBirthdayCake, FaSuitcase } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail, MdGrade, MdNumbers } from "react-icons/md";

interface ProfileCardProps {
  userData: UserProps | null;
}

export default function ProfileCard({ userData }: ProfileCardProps) {
  const user = userData?.User;
  return (
    <>
      <div className=" mx-4 sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden bg-gradient-to-b from-primary to-secondary"></div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <Image
            className="object-cover object-center h-32 bg-white "
            src="/user.png"
            alt="profile"
            fill
            sizes="(max-width: 128px) 100vw, 128px"
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">{user?.name}</h2>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <div className="lg:p-4 p-2 border-t mx-8 mt-2 flex items-center justify-around gap-6">
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center justify-start gap-2 font-semibold">
              <MdNumbers size={18} />
              Staff Number
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <IoLocationSharp size={18} />
              Location
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <MdEmail /> Department
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <FaBirthdayCake size={18} />
              Birth Date
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <MdGrade size={18} />
              Grade
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <FaSuitcase size={18} />
              Job
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <FaRankingStar size={18} />
              Qualification
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <FaRankingStar size={18} />
              Date of First Appointment
            </div>
            <div className="flex items-center justify-start gap-2 font-semibold">
              <FaRankingStar size={18} />
              Date of Last Promotion
            </div>
          </div>
          <div className="flex justify-start items-start flex-col gap-2">
            <div>{user?.employee?.staffNo}</div>
            <div>Head Office</div>
            <div>{user?.department?.departmentName}</div>
            <div>March, 31 2021</div>
            <div>DEP. H. R. MANAGER </div>
            <div>DEP. H. R. MANAGER </div>
            <div>Phd</div>
            <div>October, 20 2021</div>
            <div>October, 20 2021</div>
          </div>
        </div>
      </div>
    </>
  );
}
