import styled from "styled-components";
import { DARK_GRAY } from "./colors/colors";

const TypingIndicator: React.FC = () => {
  return (
    <StyledMessageBox>
      <Dot className="dot" />
      <Dot className="dot" />
      <Dot className="dot" />
    </StyledMessageBox>
  );
};

const StyledMessageBox = styled.div`
  background-color: ${DARK_GRAY};
  padding: 20px 30px;
  border-radius: 2px 20px 20px 35px;
  display: flex;
  align-self: self-start;
  position: relative;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  margin: 0 3px;
  opacity: 0.2;
  animation: typing-indicator-animation 1s infinite;
`;

export default TypingIndicator;
