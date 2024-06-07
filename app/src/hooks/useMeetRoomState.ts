import { useRecoilState } from "recoil";
import { meetRoomStateAtom } from "../store/atoms";
import { toastError } from "../utils/helpers";

export const useMeetRoomState = () => {
  const [meetRoomState, setMeetRoomState] = useRecoilState(meetRoomStateAtom);

  const { userStream, displayStream, videoEnabled, audioEnabled } =
    meetRoomState;

  const toggleVideo = () => {
    if (userStream) {
      if (!audioEnabled && videoEnabled) {
        userStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
        setMeetRoomState((prevState) => ({
          ...prevState,
          userStream: null,
        }));
      } else {
        userStream.getVideoTracks().forEach((track) => {
          track.enabled = !videoEnabled;
        });
      }
      setMeetRoomState((prevState) => ({
        ...prevState,
        videoEnabled: !prevState.videoEnabled,
      }));
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: audioEnabled })
        .then((stream) => {
          setMeetRoomState((prevState) => ({
            ...prevState,
            userStream: stream,
            videoEnabled: !prevState.videoEnabled,
          }));
        })
        .catch((error) => {
          toastError(error);
        });
    }
  };

  const toggleAudio = () => {
    if (userStream) {
      if (!videoEnabled && audioEnabled) {
        userStream.getAudioTracks().forEach((track) => {
          track.stop();
        });
        setMeetRoomState((prevState) => ({
          ...prevState,
          userStream: null,
        }));
      } else {
        userStream.getAudioTracks().forEach((track) => {
          track.enabled = !audioEnabled;
        });
      }
      setMeetRoomState((prevState) => ({
        ...prevState,
        audioEnabled: !prevState.audioEnabled,
      }));
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: videoEnabled, audio: true })
        .then((stream) => {
          setMeetRoomState((prevState) => ({
            ...prevState,
            userStream: stream,
            audioEnabled: !prevState.audioEnabled,
          }));
        })
        .catch((error) => {
          toastError(error);
        });
    }
  };

  const stopPresentation = () => {
    setMeetRoomState((prevState) => ({
      ...prevState,
      displayStream: null,
    }));
  };

  const togglePresentation = () => {
    if (displayStream) {
      displayStream.getTracks().forEach((track) => {
        track.stop();
      });
      stopPresentation();
    } else {
      navigator.mediaDevices
        .getDisplayMedia({
          audio: { noiseSuppression: false },
          video: { displaySurface: "browser" },
        })
        .then((stream) => {
          stream.getTracks()[0].onended = stopPresentation;
          setMeetRoomState((prevState) => ({
            ...prevState,
            displayStream: stream,
            displayAudioEnabled: stream.getAudioTracks().length > 0,
          }));
        })
        .catch((error) => {
          toastError(error);
        });
    }
  };

  return {
    ...meetRoomState,
    toggleVideo,
    toggleAudio,
    togglePresentation,
  };
};
