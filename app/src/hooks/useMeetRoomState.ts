import { useRecoilState } from "recoil";
import { meetRoomStateAtom } from "../store/atoms";
import { toastError } from "../utils/helpers";
import { useEffect } from "react";

export const useMeetRoomState = () => {
  const [meetRoomState, setMeetRoomState] = useRecoilState(meetRoomStateAtom);

  const { userStream, displayStream, videoEnabled, audioEnabled } =
    meetRoomState;

  const toggleVideo = () => {
    if (userStream) {
      if (!audioEnabled && videoEnabled) {
        userStream.getAudioTracks().forEach((track) => track.stop());
        userStream.getVideoTracks().forEach((track) => track.stop());
        setMeetRoomState((prevState) => ({
          ...prevState,
          userStream: null,
          videoEnabled: false,
        }));
      } else {
        userStream.getVideoTracks().forEach((track) => {
          track.enabled = !videoEnabled;
        });
        setMeetRoomState((prevState) => ({
          ...prevState,
          videoEnabled: !prevState.videoEnabled,
        }));
      }
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: audioEnabled })
        .then((stream) => {
          setMeetRoomState((prevState) => ({
            ...prevState,
            userStream: stream,
            videoEnabled: true,
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
        userStream.getAudioTracks().forEach((track) => track.stop());
        userStream.getVideoTracks().forEach((track) => track.stop());
        setMeetRoomState((prevState) => ({
          ...prevState,
          userStream: null,
          audioEnabled: false,
        }));
      } else {
        userStream.getAudioTracks().forEach((track) => {
          track.enabled = !audioEnabled;
        });
        setMeetRoomState((prevState) => ({
          ...prevState,
          audioEnabled: !prevState.audioEnabled,
        }));
      }
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: videoEnabled, audio: true })
        .then((stream) => {
          setMeetRoomState((prevState) => ({
            ...prevState,
            userStream: stream,
            audioEnabled: true,
          }));
        })
        .catch((error) => {
          toastError(error);
        });
    }
  };

  const stopPresentation = () => {
    if (displayStream) {
      displayStream.getTracks().forEach((track) => track.stop());
    }
    setMeetRoomState((prevState) => ({
      ...prevState,
      displayStream: null,
    }));
  };

  const togglePresentation = () => {
    if (displayStream) {
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

  useEffect(() => {
    return () => {
      if (userStream) {
        userStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [userStream]);

  useEffect(() => {
    return () => {
      if (displayStream) {
        displayStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [displayStream]);

  return {
    ...meetRoomState,
    toggleVideo,
    toggleAudio,
    togglePresentation,
  };
};
