import { useEffect, useRef } from "react";
import { Stream, User } from "../../../store/state.types";
import { getStreamType } from "../../../utils/helpers";
import { StreamTypes } from "../../../utils/constants";
import "./usertiles.css";

type Props = {
  user: User;
  stream: Stream;
};

export const UserTile = (props: Props) => {
  const { stream } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const streamType = getStreamType(stream);

  useEffect(() => {
    if (streamType === StreamTypes.Video && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    if (streamType === StreamTypes.Audio && audioRef.current) {
      audioRef.current.srcObject = stream;
    }
  }, [stream, streamType]);

  return (
    <div>
      {streamType === StreamTypes.Video && (
        <video autoPlay ref={videoRef} className="flipY" />
      )}
      {streamType === StreamTypes.Audio && <audio autoPlay ref={audioRef} />}
    </div>
  );
};
