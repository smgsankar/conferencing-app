import { useEffect, useRef } from "react";
import { useMeetRoomState } from "../../hooks/useMeetRoomState";

export const UserTiles = () => {
  const ref = useRef<HTMLVideoElement>(null);
  const { displayStream, userStream } = useMeetRoomState();

  useEffect(() => {
    if (ref.current && userStream) {
      ref.current.srcObject = userStream;
      return;
    }
    if (ref.current && displayStream) {
      ref.current.srcObject = displayStream;
    }
  }, [userStream, displayStream]);

  return (
    <section id="presentation">
      {(displayStream !== null || userStream !== null) && (
        <video
          autoPlay
          ref={ref}
          style={{
            height: "100%",
            objectFit: "contain",
            transform: userStream !== null ? "rotateY(180deg)" : undefined,
          }}
        />
      )}
    </section>
  );
};
