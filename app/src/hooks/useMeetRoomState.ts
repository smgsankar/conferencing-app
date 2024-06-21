import { useRecoilState } from "recoil";
import { meetRoomStateAtom } from "../store/atoms";
import { toastError } from "../utils/helpers";
import { useEffect } from "react";

export const useMeetRoomState = () => {
  const [meetRoomState, setMeetRoomState] = useRecoilState(meetRoomStateAtom);

  const { userStream, displayStream, videoEnabled, audioEnabled } =
    meetRoomState;

  const updateStream = (newVideoEnabled: boolean, newAudioEnabled: boolean) => {
    if (!newAudioEnabled && !newVideoEnabled && userStream) {
      userStream.getTracks().forEach((track) => track.stop());
      setMeetRoomState((prevState) => ({
        ...prevState,
        userStream: null,
        videoEnabled: newVideoEnabled,
        audioEnabled: newAudioEnabled,
      }));
      return;
    }
    if (!userStream) {
      navigator.mediaDevices
        .getUserMedia({ video: newVideoEnabled, audio: newAudioEnabled })
        .then((stream) => {
          setMeetRoomState((prevState) => ({
            ...prevState,
            userStream: stream,
            videoEnabled: newVideoEnabled,
            audioEnabled: newAudioEnabled,
          }));
        })
        .catch((error) => {
          toastError(error);
        });
    } else {
      if (audioEnabled && !newAudioEnabled) {
        userStream.getAudioTracks().forEach((track) => {
          userStream.removeTrack(track);
          track.stop();
        });
      }
      if (videoEnabled && !newVideoEnabled) {
        userStream.getVideoTracks().forEach((track) => {
          userStream.removeTrack(track);
          track.stop();
        });
      }
      if (!audioEnabled && newAudioEnabled) {
        navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => userStream.addTrack(track));
          })
          .catch((error) => {
            toastError(error);
          });
      }
      if (!videoEnabled && newVideoEnabled) {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => userStream.addTrack(track));
          })
          .catch((error) => {
            toastError(error);
          });
      }
      setMeetRoomState((prevState) => ({
        ...prevState,
        videoEnabled: newVideoEnabled,
        audioEnabled: newAudioEnabled,
      }));
    }
  };

  const toggleVideo = () => {
    updateStream(!videoEnabled, audioEnabled);
  };

  const toggleAudio = () => {
    updateStream(videoEnabled, !audioEnabled);
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
