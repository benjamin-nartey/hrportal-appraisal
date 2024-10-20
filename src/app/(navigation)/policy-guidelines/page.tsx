export const dynamic = "force-dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policy Guidlines",
};

export default function PolicyGuidelines() {
  const iframeProps: React.DetailedHTMLProps<
    React.IframeHTMLAttributes<HTMLIFrameElement>,
    HTMLIFrameElement
  > = {
    src: "/policy.pdf",
    frameBorder: "0",
  };
  return (
    <div className="w-full">
      <iframe className="w-full h-[70rem]" {...iframeProps}></iframe>
    </div>
  );
}
