import { Button, TextField } from "@shopify/polaris";
import React, { useState } from "react";

interface Props {
  methodFilter: (query: string) => void;
}

export default function SearchMethodTextField(props: Props) {
  const [textFieldValue, setTextFieldValue] = useState("");
  const handleTextFieldChange = React.useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  function handleMethodSearch() {
    props.methodFilter(textFieldValue);
    window.logger.log(textFieldValue);
  }

  return (
    <div>
      <TextField
        autoComplete="off"
        label="Search Methods"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        placeholder="Example: String#[]"
      />
      <br />
      <Button onClick={handleMethodSearch}>Search</Button>
    </div>
  );
}
