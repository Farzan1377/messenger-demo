import { useState } from "react";
import styled from "styled-components";
import { BLACK, BLUE, GRAY, LIGHT_WHITE, WHITE } from "../colors/colors";
import SendIcon from "./SendIcon";

interface Props {
  handleNewMessage: (message: string) => void;
}

const InputBox: React.FC<Props> = ({ handleNewMessage }) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSend();
      setValue("");
    }
  };

  const onSend = () => {
    handleNewMessage(value);
  };

  return (
    <Container>
      <StyledDiv>
        <StyledInput
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleEnter}
          placeholder="Start your conversation here"
        />
        <SendButton onClick={onSend}>
          <StyledSendIcon color={value === "" ? GRAY : BLUE} />
        </SendButton>
      </StyledDiv>
    </Container>
  );
};

const StyledInput = styled.input`
  padding: 15px 25px;
  background-color: ${BLACK};
  width: 100%;
  color: ${WHITE};
  border-radius: 100px;
  border-color: ${LIGHT_WHITE};
`;

const StyledDiv = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSendIcon = styled(SendIcon)`
  position: absolute;
  right: 80px;
`;

const Container = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 26px;
  z-index: 999;
  background-color: ${BLACK};
  padding-bottom: 70px;
  height: 100px;
`;

const SendButton = styled.div``;

export default InputBox;
