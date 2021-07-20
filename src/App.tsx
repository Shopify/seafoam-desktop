import * as React from "react";
import * as ReactDOM from "react-dom";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, TopBar } from "@shopify/polaris";

const App = () => {
  const [searchValue, setSearchValue] = React.useState("");

  const onSearchValueChange = React.useCallback(
    (value) => setSearchValue(value),
    []
  );

  // The App is tentatively split into two "sections". This is achieved by using two full-height divs, and using CSS flex
  // to create a 2:1 ratio between the right and left panel.

  return (
    <div style={styles.app as React.CSSProperties}>
      <AppProvider i18n={enTranslations}>
        <div style={styles.box as React.CSSProperties}>
          <div style={styles.left as React.CSSProperties}>
            <Page title="Dump Panel"></Page>
          </div>
          <div style={styles.right as React.CSSProperties}>
            <Page title="Graph Panel">
              <TopBar.SearchField
                value={searchValue}
                onChange={onSearchValueChange}
              />
            </Page>
          </div>
        </div>
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
    flex: 1,
  },
  right: {
    flex: 2,
  },
};

ReactDOM.render(<App />, document.querySelector("#app"));
