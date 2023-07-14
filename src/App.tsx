import { useContext } from "react";
import "./App.scss";
import { Grid } from "./components/Game/Grid.tsx";
import HelpMenu from "./components/Modals/HelpMenu.tsx";
import { MainMenu } from "./components/Modals/MainMenu.tsx";
import { SettingsMenu } from "./components/Modals/SettingsMenu.tsx";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { AppContext, IAppContext } from "./context/AppContext";
import { EndGameMenu } from "./components/Modals/EndGameMenu.tsx";

function App() {
  const { isGridReady } = useContext<IAppContext>(AppContext);

  return (
    <>
      <Navbar />
      {isGridReady && <Grid />}
      <MainMenu />
      <HelpMenu />
      <SettingsMenu />
      <EndGameMenu />
    </>
  );
}

export default App;
