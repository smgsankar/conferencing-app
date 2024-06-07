import { useEffect, useRef } from "react";
import { useMeetRoomState } from "../../hooks/useMeetRoomState";

export const UserTiles = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const { displayStream } = useMeetRoomState();

  useEffect(() => {
    if (ref.current && displayStream) {
      ref.current.srcObject = displayStream;
    }
  }, [displayStream]);

  return (
    <section id="presentation">
      {!!displayStream && (
        <video muted autoPlay ref={ref} style={{ width: "100%" }} />
      )}
    </section>
  );
};
