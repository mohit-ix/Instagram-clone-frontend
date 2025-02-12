import "./LightButton.css"

export default function LightButton({ children, ...props }) {
  return <button className="light-button" {...props}>{children}</button>;
}
