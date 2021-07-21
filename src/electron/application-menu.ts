import { app, dialog, Menu, MenuItemConstructorOptions } from "electron";
import * as fs from "fs";

const GRAAL_DUMP_EXTENSION = ".bgv";
const IS_MAC = process.platform === "darwin";

const macMenu: MenuItemConstructorOptions = {
  label: app.name,
  submenu: [
    {
      role: "about",
    },
    {
      role: "quit",
    },
  ],
};

const primaryMenu: MenuItemConstructorOptions = {
  label: "File",
  submenu: [
    {
      label: "Open BGV File",
      click: (_menuItem, browserWindow, _event) => {
        dialog
          .showOpenDialog(browserWindow, {
            filters: [
              {
                name: "Graal Dump File",
                extensions: [GRAAL_DUMP_EXTENSION.substr(1)],
              },
            ],
            properties: ["openFile", "dontAddToRecent"],
          })
          .then((result) => {
            if (!result.canceled) {
              const filename = result.filePaths[0];
              console.debug(filename);
            }
          });
      },
    },
    {
      label: "Open BGV Directory",
      click: (_menuItem, browserWindow, _event) => {
        dialog
          .showOpenDialog(browserWindow, {
            properties: ["openDirectory", "dontAddToRecent"],
          })
          .then((result) => {
            if (!result.canceled) {
              const directory = result.filePaths[0];

              fs.readdir(directory, (err, files) => {
                if (err) {
                  console.error(err);
                } else {
                  const dumpFiles = files.filter((file) =>
                    file.endsWith(GRAAL_DUMP_EXTENSION)
                  );
                  console.debug(dumpFiles);
                }
              });
            }
          });
      },
    },
  ],
};

const menu = IS_MAC ? [macMenu, primaryMenu] : [primaryMenu];

export const applicationMenu = Menu.buildFromTemplate(menu);
