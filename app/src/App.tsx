import { RecoilRoot } from "recoil";
import { MeetRoom } from "./meetroom";
import "./App.css";
import { Suspense } from "react";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <MeetRoom />
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
