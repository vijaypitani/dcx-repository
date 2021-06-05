import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Contact from '../Contact';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
import { shallow, configure } from 'enzyme';
configure({ adapter: new Adapter() });
import { UserContext } from '../Home'


describe("Contact", () => {
  let wrapper;
  let stopSubmission;
  beforeEach(() => {
    stopSubmission = jest.fn();
    wrapper = shallow(<Contact submit={stopSubmission} />);
  });

  //Snapshot Test
  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  //Test if a button is disabled
  test('renders disabled contact button', () => {
    const div = document.createElement("div");
    ReactDOM.render(<Router> <UserContext.Provider value={{ Role: "Developer", Auth: false }}><Contact /></UserContext.Provider></Router>, div)
    const button = div.querySelector('button');
    expect(button).toBeDisabled();
  });

  it('renders submit button', () => {
    const wrapper = mount(<Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}><Contact>Submit</Contact></UserContext.Provider></Router>);
    const button = wrapper.find('button');
    expect(button).toHaveLength(2);
  });


  //Check name placeholder
  test('check name placeholder', async () => {
    render(
      <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>
        <Contact />
      </UserContext.Provider>
      </Router>
    )
    await waitFor(() => screen.getAllByPlaceholderText('eg. John Doe'))
    expect(screen.getAllByPlaceholderText('eg. John Doe')).toBeTruthy()
  })

  //Check email placeholder
  test('check email placeholder', async () => {
    render(
      <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>
        <Contact /></UserContext.Provider>
      </Router>
    )
    await waitFor(() => screen.getAllByPlaceholderText('eg. john.doe@gmail.com'))
    expect(screen.getAllByPlaceholderText('eg. john.doe@gmail.com')).toBeTruthy()
  })

  //Check phone placeholder
  test('check phone placeholder', async () => {
    render(
      <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>
        <Contact /></UserContext.Provider>
      </Router>
    )
    await waitFor(() => screen.getAllByPlaceholderText('eg. 9234578914'))
    expect(screen.getAllByPlaceholderText('eg. 9234578914')).toBeTruthy()
  })

  //check location placeholder
  test("check location input", () => {
    render(
      <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>

        <Contact />
      </UserContext.Provider>
      </Router>
    )
    const input = screen.getByTitle("location")
    fireEvent.change(input, { target: { value: "Select location" } })
    expect(input.value).toBe("Select location")
  })

  //check budget placeholder
  test("check budget input", () => {
    render(
      <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>

        <Contact />
      </UserContext.Provider>
      </Router>
    )
    const input = screen.getByTitle("budget")
    fireEvent.change(input, { target: { value: "Select budget" } })
    expect(input.value).toBe("Select budget")
  })


  //Check website placeholder
  test('check phone placeholder', async () => {
    render(
      <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>
        <Contact /></UserContext.Provider>
      </Router>
    )
    await waitFor(() => screen.getAllByPlaceholderText('gadgetskey.com'))
    expect(screen.getAllByTitle('website')).toBeTruthy()
    expect(screen.getAllByPlaceholderText('gadgetskey.com')).toBeTruthy()
  })

})


//Checking contact validation
test("check validation", () => {
  render(
    <Router><UserContext.Provider value={{ Role: "Developer", Auth: false }}>

      <Contact /></UserContext.Provider>

    </Router>
  )
  const inputName = screen.getByTitle("name")
  const inputEmail = screen.getByTitle("email")
  const inputPhone = screen.getByTitle("phone")
  const inputLocation = screen.getByTitle("location")
  const inputBudget = screen.getByTitle("budget")
  const inputWebsite = screen.getByTitle("website")
  fireEvent.change(inputEmail, { target: { value: "" } })
  fireEvent.change(inputPhone, { target: { value: "" } })
  fireEvent.change(inputName, { target: { value: "" } })
  fireEvent.change(inputLocation, { target: { value: "" } })
  fireEvent.change(inputBudget, { target: { value: "" } })
  fireEvent.change(inputWebsite, { target: { value: "" } })
  fireEvent.click(screen.getByTitle("sign"))
  expect(screen.getByTitle("nameError").innerHTML).toBe("Name cannot be empty")
  expect(screen.getByTitle("emailError").innerHTML).toBe("Email cannot be empty")
  expect(screen.getByTitle("phoneError").innerHTML).toBe("Invalid phone number")
  expect(screen.getByTitle("locationError").innerHTML).toBe("Please choose a location")
  expect(screen.getByTitle("budgetError").innerHTML).toBe("Please select your budget")
  expect(screen.getByTitle("websiteError").innerHTML).toBe("Website cannot be empty")
})
