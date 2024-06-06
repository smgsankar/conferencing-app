import { RecoilRoot } from "recoil";
import "./App.css";
import { Suspense } from "react";

function App() {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Chat</h1>
      </Suspense>
    </RecoilRoot>
  );
}

export default App;
