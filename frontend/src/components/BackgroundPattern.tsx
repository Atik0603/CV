import BackgroundPatternDark from "./BackgroundPatternDark";
import BackgroundPatternLight from "./BackgroundPatternLight";
import "../styles/BackgroundPattern.css";

function BackgroundPattern() {
  return (
    <div className="background-pattern-wrapper">
      <div className="pattern-dark">
        <BackgroundPatternDark />
      </div>
      <div className="pattern-light">
        <BackgroundPatternLight /> 
      </div>
    </div>
  );
}

export default BackgroundPattern;