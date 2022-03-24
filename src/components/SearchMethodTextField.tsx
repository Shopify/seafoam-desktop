import React from "react";
import { Input } from "antd";

const { Search } = Input;

interface Props {
  methodFilter: (query: string) => void;
}

export default function SearchMethodTextField(props: Props) {
  return (
    <div>
      <div style={{ marginBottom: "4px" }}>Search Methods:</div>
      <Search
        placeholder="Example: String#[]"
        onSearch={(value) => props.methodFilter(value)}
      />
    </div>
  );
}
