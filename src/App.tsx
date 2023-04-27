import "./App.css";
import Stack from "react-bootstrap/Stack";

import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styled from "styled-components";
import { BLACK, BLUE, GRAY } from "./colors/colors";
import { getTime } from "./helper-functions/getTime";
import InputBox from "./components/InputBox";
import MessageBox, { LeftOrRight } from "./components/MessageBox";
import { useEffect, useRef, useState } from "react";
import TypingIndicator from "./TypingIndicator";
import { getResponse } from "./sampleResponses";

interface MessagePair {
  question: string;
  response: string;
  shouldShow: boolean;
}

function App() {
  const [messagesPair, setMessagesPair] = useState<Array<MessagePair>>([]);
  const [showIsTyping, setShowIsTyping] = useState<boolean>(false);
  const [currentPair, setCurrentPair] = useState<number>(0);
  const messageRef = useRef<HTMLDivElement>(null);

  const handleNewMessage = (message: string) => {
    setMessagesPair([
      ...messagesPair,
      { question: message, response: getResponse(), shouldShow: false },
    ]);
    setTimeout(() => setShowIsTyping(true), 1000);
  };

  useEffect(() => {
    if (showIsTyping) {
      const newArray = [...messagesPair];
      newArray[currentPair] = { ...newArray[currentPair], shouldShow: true };

      setTimeout(() => {
        setShowIsTyping(false);
        setMessagesPair(newArray);
        setCurrentPair(currentPair + 1);
      }, 2000);
    }
  }, [showIsTyping]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messagesPair]);

  return (
    <StyledContainer>
      <MessageBox
        leftOrRight={LeftOrRight.LEFT}
        message="Hi, how can I help you today?"
      />

      {messagesPair.map((messagePair, index) => (
        <MessagePairContainer className="message-list" ref={messageRef}>
          <MessageBox
            key={index}
            leftOrRight={LeftOrRight.RIGHT}
            message={messagePair.question}
          />

          {messagePair.shouldShow ? (
            <MessageBox
              key={index}
              leftOrRight={LeftOrRight.LEFT}
              message={messagePair.response}
            />
          ) : null}
        </MessagePairContainer>
      ))}
      {showIsTyping ? <TypingIndicator /> : null}

      <InputBox handleNewMessage={handleNewMessage} />
    </StyledContainer>
  );
}

const MessagePairContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 30px;
`;

const StyledContainer = styled.div`
  background-color: ${BLACK};
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px 50px;
`;

const Spacer = styled.div`
  height: 5px;
`;

export default App;
