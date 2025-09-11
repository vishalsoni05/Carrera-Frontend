import React, { useRef } from "react";

export default function KeepAliveWrapper({ children }) {
  const ref = useRef(null);


  if (!ref.current) {
    ref.current = children;
  }

  return ref.current;
}
