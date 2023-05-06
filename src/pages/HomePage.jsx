import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { List } from '../components/List';
import { Card } from '../components/Card'
import { Controls } from '../components/Controls'

import { ALL_COUNTRIES } from '../countryAPI-config';

export function HomePage({countries, setCountries}) {

  const [filteredCountries, setFilteredCountries] = useState(countries);
  
  const navigate = useNavigate();

  const handleSearch = (search, region) =>{
    let data = [...countries];

    if(region){
      data = data.filter(country => country.region.includes(region))
    }

    if(search) {
      data = data.filter(country => 
        country.name.common.toLowerCase().includes(search.toLowerCase())
      )
    }

    setFilteredCountries(data)
  }

  useEffect(() => {
    // if(!countries.length)
      axios.get(ALL_COUNTRIES).then(({data}) => setCountries(data))
  }, [])
  
  return (
    <>
      <Controls onSearch={handleSearch} />
        <List>
          {filteredCountries.map((country =>{ 
            const countryInfo = {
              img: country.flags.svg,
              name: country.name.common,
              info: [
                {title: 'Population', description: country.population},
                {title: 'Region', description: country.region},
                {title: 'Capital', description: country.capital},
              ]
            }
            return(
              <Card 
                key={country.name.common} 
                {...countryInfo}
                onClick={() => navigate(`/country/${country.name.common}`)} 
              />
              )  
          }))}
        </List> 
    </>
  );
}