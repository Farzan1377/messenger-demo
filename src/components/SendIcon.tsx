import { useState } from "react";
import styled from "styled-components";
import { BLACK, LIGHT_WHITE, WHITE } from "../colors/colors";

interface Props {
  color: string;
}

const SendIcon: React.FC<Props> = ({ color }) => {
  return (
    <svg
      width="40px"
      height="40px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 12L4 4L6 12M20 12L4 20L6 12M20 12H6"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const StyledImg = styled.svg``;

export default SendIcon;
