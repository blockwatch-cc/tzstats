import React from 'react';
import styled from 'styled-components';
import Colors from '../../Common/Colors';
import { Devices } from '../../Common';
import { Link } from 'react-router-dom';

const Footer = () => (
  <Wrapper hideOnMobile>
    <Text>
      {'Have a question? Contact us via '}
      <LinkedText>
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/tzstats">
          Twitter
        </a>
      </LinkedText>
      {' or '}
      <LinkedText>
        <a target="_blank" rel="noopener noreferrer" href="https://discord.gg/D5e98Hw">
          Discord
        </a>
      </LinkedText>
    </Text>
    <Text>
      <LinkedText>
        <a target="_blank" rel="noopener noreferrer" href="https://tzstats.com/blog">Blog</a>
      </LinkedText>
    </Text>
    <Text>
      <Link to="/terms">Terms & Conditions</Link>
    </Text>
    <Text>
      <Link to="/privacy">Privacy Policy</Link>
    </Text>
  </Wrapper>
);
export default Footer;

const Wrapper = styled.div`
  color: ${Colors.LIGHT_GRAY5};
  font-size: 10px;
  text-align: center;
  height: 30px;
  padding: 10px 0;
  @media ${Devices.mobileL} {
    ${props => props.hideOnMobile && 'display: none;'}
  }
`;

const LinkedText = styled.span`
  color: #fff;
  cursor: pointer;
`;

const Text = styled.span`
  padding-right: 50px;
  color: rgba(255, 255, 255, 0.52);
`;
