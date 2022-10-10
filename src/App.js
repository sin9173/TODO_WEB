import MemberRouter from "./routes/MemberRouter";
import WorkRouter from "./routes/WorkRouter";

function App() {
  return (
    <div className="App">
      <WorkRouter/>  
      <MemberRouter/>
    </div>
  );
}

export default App;
