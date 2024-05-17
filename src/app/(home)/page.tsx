import Image from "next/image";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  return (
    <main className="relative h-screen w-screen overflow-hidden flex justify-center items-center">
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-b from-teal-400 to-blue-900 rounded-full translate-x-[-10rem] translate-y-[-5rem]"></div>
      <div className="absolute bottom-0 right-0 w-[23rem] h-[23rem] bg-gradient-to-b from-teal-400 to-blue-900 rounded-full translate-x-[10rem] translate-y-[5rem]"></div>
      <div className="lg:w-[80%] lg:h-[80%] w-[95%] h-[95%] z-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 flex lg:p-0 p-4">
        <div
          style={{
            backgroundImage: `url(bg1.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
          className="flex-1 lg:flex justify-center items-center hidden"
        >
          <Image
            className="translate-x-[5rem]"
            src="/illustration-1.png"
            width={400}
            height={400}
            alt="metrics"
          />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center justify-center shadow-lg p-6 lg:w-[60%] w-full bg-white rounded">
            <h2 className="text-[18px] text-[#275254] font-medium mb-4">
              WELCOME TO
            </h2>
            <div className="flex justify-center items-center gap-2 mb-4">
              <Image
                src="/logo-cocobod.png"
                height={60}
                width={60}
                alt="logo"
              />
              <div className="w-[1px] h-[35px] bg-[#724c2a]"></div>
              <h1 className="text-base text-[#724c2a] font-medium flex flex-col items-center justify-center">
                Ghana Cocoa Board
                <span className="text-[7.5px]">
                  Poised to Maintain Premium Quality Cocoa
                </span>
              </h1>
            </div>
            <h3 className="mb-2">Login to proceed to the homepage</h3>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
