import { Provider } from "react-redux";
import "./App.css";
import Router from "./shared/Router";
import { configStore } from "./redux/config/configStore";

function App() {
  //TODO: 라우터 연결
  return (
    <div>
      <Provider store={configStore}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
