export default function page() {
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
