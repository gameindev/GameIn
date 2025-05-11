import styled from 'styled-components';
import './App.css';
import { useTheme } from './context/ThemeProvider';

const StyledH1 = styled.h1`
  color: ${({ theme }) => theme.baseColors.brandPrimary};
`;

function App() {
  const { themeMode, toggleTheme } = useTheme();


  return (
    <>
      <StyledH1>Game In</StyledH1>
      <p>Current theme: {themeMode}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
}

export default App;


