import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login';
import { UserContext } from '../Home'


test('renders without crashing', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Login /></Router>, div)
  ReactDOM.unmountComponentAtNode(div);
});


test('should render login component', () => {
  render(<Router><Login /></Router>);
  // screen.debug()
  const login = screen.getByTestId('login');
  expect(login).toBeInTheDocument();
  expect(login).toHaveTextContent('Login to Continue')
  expect(login.querySelector('label').textContent).toBe('Email Address')
  expect(login.querySelector('button').textContent).toBe('Login')
})

//Test if a button is disabled
test('renders disabled login button', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><Login /></Router>, div)
  const button = div.querySelector('button');
  expect(button).toBeDisabled();
});

//check email input tag
describe("check email input", () => {
  render(
    <Router>

      <UserContext.Provider value={{ Role: "Admin", Auth: false }}>
        <Login />
      </UserContext.Provider>

    </Router>
  )
  const input = screen.getByTitle("email")
  fireEvent.change(input, { target: { value: "email@gmail.com" } })
  expect(input.value).toBe("email@gmail.com")
})


//Check email placeholder
test('check email placeholder', async () => {
  render(
    <Router>
      <UserContext.Provider value={{ Role: "Admin", Auth: false }}>
        <Login />
      </UserContext.Provider>
    </Router>
  )
  await waitFor(() => screen.getAllByPlaceholderText('eg. john.doe@gmail.com'))
  expect(screen.getAllByPlaceholderText('eg. john.doe@gmail.com')).toBeTruthy()
})

//Check password placeholder
test('check password placeholder', async () => {
  render(
    <Router>
      <Login />
    </Router>
  )
  await waitFor(() => screen.getAllByPlaceholderText('Choose a secure password'))
  expect(screen.getAllByPlaceholderText('Choose a secure password')).toBeTruthy()
})


//Checking login validation
test("check validation", () => {
  render(
    <Router>

      <Login />

    </Router>
  )
  const inputEmail = screen.getByTitle("email")
  const inputPassword = screen.getByTitle("password")
  fireEvent.change(inputEmail, { target: { value: "" } })
  fireEvent.change(inputPassword, { target: { value: "" } })
  fireEvent.click(screen.getByTitle("sign"))
  expect(screen.getByTitle("emailError").innerHTML).toBe("")
  expect(screen.getByTitle("passwordError").innerHTML).toBe("")
})
