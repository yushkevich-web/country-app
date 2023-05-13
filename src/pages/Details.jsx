import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

import { Button } from '../components/Button'

import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../countryAPI-config';
import Info from '../components/Info';

export function Details() {
  const [country, setCountry] = useState(null)

  let {name} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({data}) => setCountry(data[0]))
  }, [name])

  return (
    <div>
      Details about {name}
      
      <Button onClick={() => navigate('/')}>
        <IoArrowBack /> Back
      </Button>
      {country ? <Info {...country}/> : null}
    </div>
  );
}