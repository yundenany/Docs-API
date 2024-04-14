import "./index.scss";
import docsIcon from "../../assets/docsIcon.png";

export default function Topbar({ photoURL }: TopbarProps) {
  return (
    <div className="top-bar">
      <div className="topbar-left">
        <img src={docsIcon} className="docs-icon" />
        <p className="top-title">Docs</p>
        <img className="top-image" src={photoURL} />
      </div>
    </div>
  );
}
