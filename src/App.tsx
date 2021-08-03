import * as React from "react";
import * as ReactDOM from "react-dom";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider } from "@shopify/polaris";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { SelectedDumpFileProvider } from "./contexts/SelectedDumpFileContext";

const App = () => {
  // The App is tentatively split into two "sections". This is achieved by using two full-height divs, and using CSS flex
  // to create a 2:1 ratio between the right and left panel.

  return (
    <div style={styles.app as React.CSSProperties}>
      <AppProvider i18n={enTranslations}>
        <SelectedDumpFileProvider>
          <div style={styles.box as React.CSSProperties}>
            <div style={styles.left as React.CSSProperties}>
              <LeftPanel />
            </div>
            <div style={styles.right as React.CSSProperties}>
              <RightPanel />
            </div>
          </div>
        </SelectedDumpFileProvider>
      </AppProvider>
    </div>
  );
};

const styles = {
  app: {
    flex: 1,
    width: "100vw",
    height: "100vh",
    flexDirection: "row",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  left: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    overflow: "scroll",
    height: "100vh",
    width: "30vw",
  },
  right: {
    flex: 2,
    height: "100vh",
  },
};

ReactDOM.render(<App />, document.querySelector("#app"));
