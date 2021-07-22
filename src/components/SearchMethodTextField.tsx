import { TextField } from "@shopify/polaris";
import React, { useCallback, useState } from "react";

export default function SearchMethodTextField() {
  const [textFieldValue, setTextFieldValue] = useState("");

  const handleTextFieldChange = useCallback(
    (value) => setTextFieldValue(value),
    []
  );

  return (
    <TextField
      label="Search Methods"
      value={textFieldValue}
      onChange={handleTextFieldChange}
      placeholder="Example: String#[]"
    />
  );
}
