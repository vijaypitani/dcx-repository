import { render, screen } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../Register';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import { UserContext } from '../Home'


describe("Register", () => {
  let wrapper;
  let stopSubmission;
  beforeEach(() => {
    stopSubmission = jest.fn();
    wrapper = shallow(<Register submit={stopSubmission} />);
  });

  //Snapshot Test
  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  //Test if a button is disabled
  it('renders register button', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router>    <UserContext.Provider value={{ Role: "Admin", Auth: false }}>
      <Register />
    </UserContext.Provider></Router>, div)
    const button = div.querySelector('button');
    expect(button).toBeDisabled();
  });



  it('calls stopSubmission function when form is submitted', () => {
    const stopSubmission = jest.fn();
    const wrapper = mount(<Router>    <UserContext.Provider value={{ Role: "Admin", Auth: false }}>
      <Register onSubmit={stopSubmission} />
    </UserContext.Provider></Router>);
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(stopSubmission).toHaveBeenCalledTimes(0);
  });

  it('renders text input with label (default type)', () => {
    const wrapper = mount(<Router> <UserContext.Provider value={{ Role: "Admin", Auth: false }}><Register name="full_name" label="Full Name:" /></UserContext.Provider></Router>);
    const label = wrapper.find('label');
    expect(label).toHaveLength(4);
    const input = wrapper.find('input');
    expect(input).toHaveLength(3);

  });

  it('renders buttons', () => {
    const wrapper = mount(<Router><UserContext.Provider value={{ Role: "Admin", Auth: false }}><Register >Submit</Register></UserContext.Provider></Router>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(2);

  });
  it('renders select with custom text', () => {
    const wrapper = mount(<Router><UserContext.Provider value={{ Role: "Admin", Auth: false }}><Register >Submit</Register></UserContext.Provider></Router>);
    const select = wrapper.find('select');
    expect(select).toHaveLength(1);
    expect(select.prop('name')).toEqual('group');
    expect(select.prop('className')).toEqual('custom-select');
    expect(select.text()).toEqual('Select groupAdminDeveloper');

  });
})

