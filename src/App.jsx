import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { message, open } from "@tauri-apps/api/dialog";
import { appDir } from '@tauri-apps/api/path';

import "./App.css";

function App() {
  const [installationPath, setInstallationPath] = useState("");

  async function selectPath() {
    const selected = await open({
      directory: true,
      multiple: false,
      defaultPath: await appDir(),
    });
    if (selected === null) {
      await message('No selection', "Alert");
    } else {
      setInstallationPath(selected);
    }
  }

  async function install() {
    await invoke("install", { path: installationPath });
    await message('Successfully installed', "Alert");
  }

  return <div className="container">
    <h1>Installation POC</h1>

    <p>Select the installation directory.</p>

    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        selectPath();
      }}
    >
      <input
        id="path-input"
        onChange={(e) => setInstallationPath(e.currentTarget.value)}
        placeholder="Enter your directory"
        value={installationPath}
      />
      <button type="submit">Select</button>
    </form>

    <form
      id="install-form"
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        if (installationPath !== "") {
          install();
        }
      }}
    >
      <button type="submit">Install</button>
    </form>
  </div>;
}

export default App;
