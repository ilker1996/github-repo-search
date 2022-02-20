import React from 'react';
import styled from 'styled-components';
import ReactTimeago from 'react-timeago';

import {stringToRGB} from '../service/utils.js';

const Card = ({ item }) => {
  const {
    title,
    description,
    language,
    link,
    owner,
    owner_avatar,
    updated_at,
  } = {
    title: item.name,
    description: item.description,
    language: item.language,
    link: item.html_url,
    owner: item.owner.login,
    owner_avatar: item.owner.avatar_url,
    updated_at: item.updated_at,
  }

  return (
    <Container>
      <OwnerInfo>
        <Avatar src={owner_avatar}/>
        <OwnerName>{owner}</OwnerName>
      </OwnerInfo>
      <RepositoryInfo>
        <Link href={link}>
          <Title>{title}</Title>
        </Link>
        <Description>{description}</Description>
        <Byline>
          <Language>
            <Circle style={language && {backgroundColor: stringToRGB(language)}} />
            {language}
          </Language>
          {updated_at && 
            <Time>
              <ReactTimeago date={updated_at} />
            </Time>
          }
        </Byline>
      </RepositoryInfo>
    </Container>
  )
}

const Container = styled.div`
  background-image: linear-gradient(to bottom, #eab65b , #FFFFFF);
  display: flex;
  flex-direction: row;
  border: solid 4px #3a3a3a;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 20px;
  &:hover {
    background-image: linear-gradient(to top, #eab65b , #FFFFFF);
    transition-duration: .5s;
    transform: scale(1.1, 1.1);
  }
`
const OwnerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 20%;
`
const OwnerName = styled.h1`
  color: rgba(0, 0, 0, .7);
  font-family: American Typewriter, serif; 
  font-size: 15px;
  letter-spacing: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  width: 100%;
`
const RepositoryInfo = styled.div`
  flex: 1;
  display: flex;
  width: 70%;
  flex-direction: column;
  margin-left: 10px;
`
const Link = styled.a`
  flex: 1;
  border: solid 3px #000000;
  border-radius: 20px;
  border-top-style: none;
  border-left-style: none;
  border-right-style: none;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    transition-duration: 1s;
    transform: scale(0.9);
  }
  &:hover h1{
    color: #58A6FF;
    transition-duration: 1s;
    transform: translateY(-10px) scale(1.2);
    text-shadow: 3px 3px 15px rgba(256, 256, 256, .5);
    letter-spacing: 5px;
  }
  &:active h1{
    color: #FFFFFF;
    transition-duration: 1s;
    transform: translateY(0) scale(1, 1);
    text-shadow: 3px 3px 15px rgba(0, 0, 0, .5);
    letter-spacing: 5px;
  }
  &:active {
    background-color: #58A6FF;
  }
`
const Title = styled.h1`
  color: black;
  font-family: Verdana, American Typewriter, serif;
  font-size: 22px;
  letter-spacing: 3px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
const Description = styled.h2`
  flex: 1;
  text-align: center;
  font-family: Lucida Sans;
  font-size: 17px;
  letter-spacing: 2px;
  font-weight: bold;
`
const Byline = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const Circle = styled.div`
  height: 15px;
  width: 15px;
  margin-right: 10px;
  border-radius: 50%;
`
const Language = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  font-family: Optima, sans-serif;
  font-size: 13px;
  letter-spacing: 2x;
  font-weight: 600;
`
const Time = styled.p`
  align-self: center;
  text-align: center;
  font-family: Optima, sans-serif;
  font-size: 12px;
  letter-spacing: 2px;
  font-weight: 600;
  
`

const Avatar = styled.img`
  margin-top: 10px;
  border: solid 10px rgba(100, 100, 100, .5);
  border-radius: 50%;
  height: 50%;
  width: 50%;
`

export default Card;