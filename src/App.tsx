import * as React from "react";
import * as ReactDOM from "react-dom";
import enTranslations from '@shopify/polaris/locales/en.json';
import {AppProvider, Page, Card, ResourceList, TextStyle, Avatar} from '@shopify/polaris';

function render() {
  ReactDOM.render(
    <AppProvider i18n={enTranslations}>
      <Page>
        <Card>
          <ResourceList
            showHeader
            items={[
              {
                id: 341,
                url: 'customers/341',
                name: 'Mae Jemison',
                location: 'Decatur, USA',
              },
              {
                id: 256,
                url: 'customers/256',
                name: 'Ellen Ochoa',
                location: 'Los Angeles, USA',
              },
            ]}
            renderItem={(item) => {
              const {id, url, name, location} = item;
              const media = <Avatar customer size="medium" name={name} />;

              return (
                <ResourceList.Item id={id.toString()} url={url} media={media}>
                  <h3>
                    <TextStyle variation="strong">{name}</TextStyle>
                  </h3>
                  <div>{location}</div>
                </ResourceList.Item>
              );
            }}
          />
        </Card>
      </Page>
    </AppProvider>,
    document.body
  );
}

render();
