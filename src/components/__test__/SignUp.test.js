import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { shallow, configure } from 'enzyme';
import SignUp from '../SignUp';
configure({ adapter: new Adapter() });

// Test if a button is disabled
test('renders login button', () => {
  const div = document.createElement("div");
  ReactDOM.render(<Router><SignUp /></Router>, div)
  const button = div.querySelector('button');
  expect(button).toBeDisabled();
});


it('calls stopSubmission function when form is submitted', () => {
  const stopSubmission = jest.fn();
  const wrapper = mount(<Router><SignUp onSubmit={stopSubmission} /></Router>);
  const form = wrapper.find('form');
  form.simulate('submit');
  expect(stopSubmission).toHaveBeenCalledTimes(0);
});

it('renders text input with label (default type)', () => {
  const wrapper = mount(<Router><SignUp name="full_name" label="Full Name:" /></Router>);
  const label = wrapper.find('label');
  expect(label).toHaveLength(4);
  const input = wrapper.find('input');
  expect(input).toHaveLength(3);

});

it('renders buttons', () => {
  const wrapper = mount(<Router><SignUp >Submit</SignUp></Router>);
  const button = wrapper.find('button');
  expect(button).toHaveLength(2);

});
it('renders select with custom text', () => {
  const wrapper = mount(<Router><SignUp >Submit</SignUp></Router>);
  const select = wrapper.find('select');
  expect(select).toHaveLength(1);
  expect(select.prop('name')).toEqual('group');
  expect(select.prop('className')).toEqual('custom-select');
  expect(select.text()).toEqual('Select groupDeveloper');

});


//check email input tag
test("check email input", () => {
  render(
    <Router>

      <SignUp />

    </Router>
  )
  const input = screen.getByTitle("email")
  fireEvent.change(input, { target: { value: "email@gmail.com" } })
  expect(input.value).toBe("email@gmail.com")
})

//Check name placeholder
test('check name placeholder', async () => {
  render(
    <Router>
      <SignUp />
    </Router>
  )
  await waitFor(() => screen.getAllByPlaceholderText('eg. John Doe'))
  expect(screen.getAllByPlaceholderText('eg. John Doe')).toBeTruthy()
})

//Check email placeholder
test('check email placeholder', async () => {
  render(
    <Router>
      <SignUp />
    </Router>
  )
  await waitFor(() => screen.getAllByPlaceholderText('eg. john.doe@gmail.com'))
  expect(screen.getAllByPlaceholderText('eg. john.doe@gmail.com')).toBeTruthy()
})

//Check password placeholder
test('check password placeholder', async () => {
  render(
    <Router>
      <SignUp />
    </Router>
  )
  await waitFor(() => screen.getAllByPlaceholderText('John*123#'))
  expect(screen.getAllByPlaceholderText('John*123#')).toBeTruthy()
})

//check group placeholder
test("check group input", () => {
  render(
    <Router>

      <SignUp />

    </Router>
  )
  const input = screen.getByTitle("group")
  fireEvent.change(input, { target: { value: "Select group" } })
  expect(input.value).toBe("Select group")
})

//Checking signup validation
test("check validation", () => {
  render(
    <Router>

      <SignUp />

    </Router>
  )
  const inputName = screen.getByTitle("full_name")
  const inputEmail = screen.getByTitle("email")
  const inputPassword = screen.getByTitle("password")
  const inputGroup = screen.getByTitle("group")
  fireEvent.change(inputEmail, { target: { value: "" } })
  fireEvent.change(inputPassword, { target: { value: "" } })
  fireEvent.change(inputName, { target: { value: "" } })
  fireEvent.change(inputGroup, { target: { value: "" } })
  fireEvent.click(screen.getByTitle("sign"))
  expect(screen.getByTitle("full_nameError").innerHTML).toBe("Name cannot be empty")
  expect(screen.getByTitle("emailError").innerHTML).toBe("Email cannot be empty")
  expect(screen.getByTitle("passwordError").innerHTML).toBe("Password cannot be empty")
  expect(screen.getByTitle("groupError").innerHTML).toBe("Group cannot be empty")
})
