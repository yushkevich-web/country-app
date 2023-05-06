import { useState, useEffect } from 'react';
import styled from 'styled-components'

import { Container } from './Container';
import { LogoHome } from './LogoHome';

const HeaderEl = styled.header`
  box-shadow: var(--shadow);
  background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

// const Title = styled.a.attrs({
//   href: '/',
// })`
//   color: var(--colors-text);
//   font-size: var(--fs-sm);
//   font-weight: var(fw-bold);
// `;


const ModeSwitcher = styled.div`
  color: var(--colors-text);
  font-size: var(--fs-sm);
  font-weight: var(fw-bold);
  cursor: pointer;
  text-transform: capitalize;
`;

export function Header() {
  
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    document.body.setAttribute('data-theme', theme )
  }, [theme])

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <LogoHome>Where is the World?</LogoHome>
          <ModeSwitcher onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <img src="/themeIcon.svg" alt="Mode Switcher" /> <span style={{marginLeft: '0.75rem'}}>{theme}</span> theme
              </>
            ) : (
              <>
                <img src="/themeIcon-dark.svg" alt="Mode Switcher" /> <span style={{marginLeft: '0.75rem'}}>{theme}</span> theme
              </>
            )}
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
}
