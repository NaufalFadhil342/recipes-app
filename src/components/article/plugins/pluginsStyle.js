const buttonStyle = {
  padding: "8px 12px",
  margin: "0 2px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  background: "white",
  cursor: "pointer",
  fontSize: "14px",
  fontFamily: "inherit",
};

const activeStyle = {
  ...buttonStyle,
  background: "#d0e8ff",
  borderColor: "#0066cc",
};

const disabledStyle = {
  ...buttonStyle,
  opacity: 0.5,
  cursor: "not-allowed",
};

export { buttonStyle, activeStyle, disabledStyle };
