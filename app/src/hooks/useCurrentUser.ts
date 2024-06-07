import { useRecoilState } from "recoil";
import { currentUserAtom } from "../store/atoms";

export const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  return {
    currentUser,
    setCurrentUser,
  };
};
