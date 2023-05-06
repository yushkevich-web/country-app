import { useState, useEffect } from "react";
import styled from "styled-components";
import { Search } from "./Search";
import { CustomSelect } from "./CustomSelect";

export const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;

@media(min-width: 767px){
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
}
`;

export function Controls({onSearch}) {
  const [searchValue, setSearchValue] = useState('');

  const [region, setRegion] = useState();

  const options = [
    { value: 'Africa', label: 'Africa' },
    { value: 'USA', label: 'USA' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Europe', label: 'Europe' },
    { value: 'Oceania', label: 'Oceania' }
  ];

  useEffect(() => {
    const regionValue = region?.value || '';
    onSearch(searchValue, regionValue);
  }, [searchValue, region])

  return (
    <Wrapper>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <CustomSelect 
        options={options} 
        placeholder={'Filter by Region'}
        isClearable
        isSearchable={false}
        value={region}
        onChange={setRegion}
      />
    </Wrapper>
  )
}