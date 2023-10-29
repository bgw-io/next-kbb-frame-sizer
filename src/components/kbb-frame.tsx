import { useEffect, useRef, useState } from "react";

export function KbbFrame({ src }: { src?: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);
  useEffect(() => {
    window.addEventListener("message", (e) => {
      if (e.source === frameRef.current?.contentWindow) {
        // This type is just a loose observation of what I have seen in messages. Height is the only one that matters really.
        const data: { height?: number; initial?: boolean; action?: string } =
          typeof e.data === "string" ? JSON.parse(e.data) : e.data;

        if (data.height) {
          console.log(data.height);
          setHeight(data.height);
        }
      }
    });
  }, []);

  return (
    <iframe
      ref={frameRef}
      style={{ height: height, width: "100%", border: "none" }}
      src={src}
    />
  );
}
