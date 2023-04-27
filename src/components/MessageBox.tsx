import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  BLACK,
  BLUE,
  BLUE_BUTTON,
  DARK_BLUE,
  GRAY,
  WHITE,
} from "../colors/colors";
import { getTime } from "../helper-functions/getTime";

const WORD_LIMIT = 20;

export enum LeftOrRight {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

interface Props {
  message: string;
  leftOrRight: LeftOrRight;
}

interface FilteredMessage {
  filteredMessage: string;
  remainingMessage: string | undefined;
}

const MessageBox: React.FC<Props> = ({ message, leftOrRight }) => {
  const [shouldShowShowMoreButton, setShouldShowShowMoreButton] =
    useState<boolean>(false);
  const [splittedMessage, setSplittedMessage] = useState<FilteredMessage>();
  const [showFullMessage, setShouldShowFullMessage] = useState<boolean>(false);

  const onShowMore = () => {
    setShouldShowFullMessage(true);
    setShouldShowShowMoreButton(false);
  };

  const filteredMessage = (message: string): FilteredMessage => {
    const words = message.trim().split(/\s+/);
    if (words.length > WORD_LIMIT) {
      setShouldShowShowMoreButton(true);
      const filteredWords = words.slice(0, WORD_LIMIT).join(" ");
      const remainingWords = words.slice(WORD_LIMIT).join(" ");
      return {
        filteredMessage: filteredWords,
        remainingMessage: remainingWords,
      };
    }
    return { filteredMessage: message, remainingMessage: undefined };
  };

  useEffect(() => {
    setSplittedMessage(filteredMessage(message));
  }, []);

  return (
    <Container alignment={leftOrRight}>
      {leftOrRight === LeftOrRight.LEFT ? (
        <SenderName>AI bot</SenderName>
      ) : null}
      <StyledMessageBox alignment={leftOrRight}>
        {showFullMessage ? message : splittedMessage?.filteredMessage}
        {shouldShowShowMoreButton ? (
          <StyledP onClick={onShowMore}>show more</StyledP>
        ) : null}
        <MessageTime>{getTime()}</MessageTime>
      </StyledMessageBox>
    </Container>
  );
};

const StyledP = styled.p`
  color: ${BLUE_BUTTON};
`;

const StyledMessageBox = styled.div<{ alignment: LeftOrRight }>`
  background-color: ${(props) =>
    props.alignment === LeftOrRight.LEFT ? BLUE : DARK_BLUE};
  color: ${(props) => (props.alignment === LeftOrRight.LEFT ? BLACK : WHITE)};
  padding: 25px 15px 20px 30px;
  border-radius: ${(props) =>
    props.alignment === LeftOrRight.LEFT
      ? "2px 20px 20px 35px"
      : "20px 2px 35px 20px"};
  transition: "height 0.5s ease";
`;

const MessageTime = styled.div`
  bottom: 10px;
  right: 50px;
  color: ${GRAY};
  font-size: 12px;
`;

const SenderName = styled.p`
  color: ${GRAY};
`;

const Container = styled.div<{ alignment: LeftOrRight }>`
  align-self: ${(props) =>
    props.alignment === LeftOrRight.LEFT ? "self-start" : "self-end"};
  position: relative;
`;

export default MessageBox;
