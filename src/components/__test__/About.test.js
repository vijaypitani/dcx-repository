import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../About';
import { UserContext } from '../Home'

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><UserContext.Provider value={{ Role: "Admin", Auth: false }}><About /></UserContext.Provider></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});


test('should render about component', () => {
  render(<Router><UserContext.Provider value={{ Role: "Admin", Auth: false }}><About /></UserContext.Provider></Router>);
  const about = screen.getByTestId('about');
  expect(about).toBeInTheDocument();
  expect(about).toHaveTextContent('XHTML Templates')

})
