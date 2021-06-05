import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { UserContext } from '../Home'

test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router> <UserContext.Provider value={{ Role: "Admin", Auth: false }}><Dashboard /></UserContext.Provider></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});

test('should render dashboard component', () => {
  render(<Router><UserContext.Provider value={{ Role: "Admin", Auth: false }}><Dashboard /></UserContext.Provider></Router>);
  const dashboard = screen.getByTestId('dashboard');
  expect(dashboard).toBeInTheDocument();
  expect(dashboard).toHaveTextContent('What Skills Do Our Developers Have?')

})
