export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function About() {
  return (
    <div className="lg:p-12 p-2 relative">
      <div
        className="w-full h-full bg-opacity-20 absolute left-0 top-0 opacity-40 "
        style={{
          backgroundImage: "url(/type-writer.svg)",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      ></div>
      <div className="max-w-2xl mx-auto p-2 relative animate-slide-in">
        <div className="">
          <div className="mb-24">
            <h1 className="text-3xl font-semibold text-center mb-4">About</h1>
            <p>
              Employee appraisal systems help managers evaluate employee job
              performance and develop a fair system of pay increases and
              promotions
            </p>
          </div>
        </div>
        <div className="">
          <div>
            <h1 className="text-2xl font-semibold text-center mb-4">
              How to use the system
            </h1>
            <ol className="list-decimal">
              <li>
                Appraise Yourself by clicking on the Appraise Yourself Card
              </li>
              <li>Score yourself against the Key Performance Indicators </li>
              <li>Submit Your scores</li>
              <li>
                Your supervisor will receive your scores and score you against
                the same Key Performance Indicators
              </li>
              <li>You Approve/Disapprove the scores by your supervisor</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
