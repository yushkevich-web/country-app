import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"
import { filterByCode } from "../countryAPI-config";


const Wrapper = styled.section`
  margin-top: 3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 100%;
  gap: 2rem;
  @media (min-width: 767px) {
    grid-template-columns: minmax(100px, 400px) 1fr;
    align-items: center;
    gap: 5rem;
  }
  @media (min-width: 1024px) {
    grid-template-columns: minmax(400px, 600px) 1fr;
  }
`;

const InfoImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const InfoTitle = styled.h1`
  margin: 0;
  font-weight: var(--fw-bold);
  `;

const ListGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (min-width: 1024px) {
    flex-direction: row;
    gap: 4rem;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  line-height: 1.8;
  & > b {
    font-weight: var(--fw-bold);
  }
`;

const Meta = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  align-items: flex-start;
  & > b {
    font-weight: var(--fw-bold);
  }
  @media (min-width: 767px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 0 1rem;
  background-color: var(--colors-ui-base);
  box-shadow: var(--shadow);
  line-height: 1.5;
  cursor: pointer;
`;

function Info(props) {
  
  const {
    name,
    flags,
    capital,
    population,
    region,
    subregion,
    currencies,
    languages,
    borders,
  } = props;

  const [neighbors, setNeighbors] = useState([]);

  const navigate = useNavigate();

  const objToArray = (obj) => {
    const arr = Object.keys( obj ).map( key => ( { key, ...obj[ key ] } ) )
    return arr.map((c) => c.name)
  }

  const getLang = (obj) => {
    const val = Object.values(obj);
    return val.map((el, index) => <span style={{paddingRight: '.5rem'}} key={index}>{el}</span>)
  }

  useEffect(() => {
    if (borders.length)
      axios
        .get(filterByCode(borders))
        .then(({ data }) => setNeighbors(data.map((c) => c.name)));
  }, [borders]);

  return (
    <Wrapper>
      <InfoImage src={flags.svg} />
      <div>
        <InfoTitle>{name.common}</InfoTitle>

        <ListGroup>
          <List>
            <ListItem>
              <span style={{fontWeight: 600}}>Official Name</span> {name.official}
            </ListItem>
            <ListItem>
              <span style={{fontWeight: 600}}>Capital</span> {capital}
            </ListItem>
            <ListItem>
              <span style={{fontWeight: 600}}>Population</span> {population}
            </ListItem>
            <ListItem>
              <span style={{fontWeight: 600}}>Region</span> {region}
            </ListItem>
            <ListItem>
              <span style={{fontWeight: 600}}>Subregion</span> {subregion}
            </ListItem>
          </List>

          <List>
            <ListItem>
              <span style={{fontWeight: 600}}>Currency</span> {objToArray(currencies)}
            </ListItem>
            <ListItem>
              <span style={{fontWeight: 600}}>Languages</span> {getLang(languages)}
            </ListItem>
            

          </List>
        </ListGroup>
        <Meta>
          <TagGroup>
            <></>  Border Countries: 
            {neighbors.map((neighbor, index) => (
              <Tag onClick={() => navigate(`/country/${neighbor.common}`)} key={index}>{neighbor.common}</Tag>
            ))}
          </TagGroup>
          
        </Meta>
      </div>
    </Wrapper>
  );
}

export default Info;