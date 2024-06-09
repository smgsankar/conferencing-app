import { RecoilRoot } from "recoil";
import { MeetRoom } from "./meetroom";
import { Suspense } from "react";
import "./meetroom/components/Sidebar/sidebar.css";
import "./meetroom/components/MeetRoom/meetroom.css";
import "./meetroom/components/Footer/footer.css";
import "./App.css";

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
