import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Policy Guidlines",
  description: "This is cocobod appraisal Policy Guidlines page",
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
