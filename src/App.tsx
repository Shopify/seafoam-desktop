import * as React from "react";
import * as ReactDOM from "react-dom";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Frame } from "@shopify/polaris";

const App = () => {
  ReactDOM.render(
    <div style={styles.app as React.CSSProperties}>
      <AppProvider i18n={enTranslations}>
        <Frame>
          <div style={styles.box as React.CSSProperties}>
            <div style={styles.left as React.CSSProperties}>hi</div>
            <div style={styles.right as React.CSSProperties}>hello</div>
          </div>
        </Frame>
      </AppProvider>
    </div>,
    document.querySelector("#app")
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
    flex: 1,
    backgroundColor: "red",
  },
  right: {
    flex: 2,
    backgroundColor: "blue",
  },
};

App();
