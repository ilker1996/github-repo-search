import React from 'react';
import styled from 'styled-components';
import ReactTimeago from 'react-timeago';

const Card = ({ item }) => {
  const {
    title,
    description,
    language,
    link,
    owner,
    owner_avatar,
    owner_link,
    updated_at,
    star_count
  } = {
    title: item.name,
    description: item.description,
    language: item.language,
    link: item.html_url,
    owner: item.owner.login,
    owner_avatar: item.owner.avatar_url,
    owner_link: item.owner.html_url,
    updated_at: item.updated_at,
    star_count: item.stargazers_count,
  }

  return (
    <Container>
      <OwnerInfo>
        <a href={owner_link}>
          <Avatar src={owner_avatar}/>
        </a>
        <Title>{owner}</Title>
      </OwnerInfo>
      <RepositoryInfo>
        <a href={link}>
          <Title>{title}</Title>
        </a>
        <Description>{description}</Description>
        <Star>{star_count}</Star>
        <Language>{language}</Language>
        <ReactTimeago date={updated_at} />
      </RepositoryInfo>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  border: solid 2px #3a3a3a;
  border-radius: 5px;
`
const OwnerInfo = styled.div`
  padding: 10px;
`
const RepositoryInfo = styled.div`
  padding: 10px;
`
const Title = styled.h1`
  font-size: 30px;
  text-align: center;
`
const Description = styled.p`
  font-size: 15px;
  text-align: center;
`
const Language = styled.p`

`
const Star = styled.p`

`
const Avatar = styled.img`
  width: 100%;
`

export default Card;