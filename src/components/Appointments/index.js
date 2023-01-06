import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    list: [],
    starredList: [],
    firstInput: '',
    secondInput: '',
    starredListClicked: false,
  }

  onFirstInputChange = event => {
    const a = event.target.value
    this.setState({firstInput: a})
  }

  onSecondInputChange = event => {
    const a = event.target.value
    this.setState({secondInput: a})
  }

  onAddButtonClicked = () => {
    const {firstInput, secondInput} = this.state
    const id = uuidv4()
    const a = {id, firstInput, secondInput, isStarred: false}
    this.setState(prevState => ({
      list: [...prevState.list, a],
      firstInput: '',
      secondInput: '',
    }))
  }

  imageStarredClicked = id => {
    this.setState(prevState => ({
      list: prevState.list.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !eachItem.isStarred}
        }
        return eachItem
      }),
    }))
  }

  starredMessages = () => {
    const {list, starredListClicked} = this.state
    if (!starredListClicked) {
      this.setState({
        starredList: list.filter(eachItem => eachItem.isStarred === true),
        starredListClicked: !starredListClicked,
      })
    } else {
      this.setState({
        starredListClicked: !starredListClicked,
      })
    }
  }

  renderUnorderedList = () => {
    const {list, starredListClicked, starredList} = this.state
    if (starredListClicked) {
      return starredList.map(eachItem => (
        <AppointmentItem
          key={eachItem.id}
          eachItem={eachItem}
          imageStarredClicked={this.imageStarredClicked}
        />
      ))
    }
    return list.map(eachItem => (
      <AppointmentItem
        key={eachItem.id}
        eachItem={eachItem}
        imageStarredClicked={this.imageStarredClicked}
      />
    ))
  }

  render() {
    const {firstInput, secondInput, starredListClicked} = this.state
    const starredButtonClass = starredListClicked
      ? 'bottom_container_one_button_starred_clicked'
      : 'bottom_container_one_button'
    return (
      <div className="background_container">
        <div className="main_container">
          <div className="show_container">
            <div className="input_container">
              <h1 className="main_container_heading">Add Appointment</h1>
              <label className="top_input_label" htmlFor="first_input">
                TITLE
              </label>
              <input
                id="first_input"
                className="top_input"
                placeholder="Title"
                onChange={this.onFirstInputChange}
                value={firstInput}
              />
              <label className="top_input_label" htmlFor="second_input">
                DATE
              </label>
              <input
                id="second_input"
                className="top_input"
                type="date"
                placeholder="dd/mm/yyyy"
                onChange={this.onSecondInputChange}
                value={secondInput}
              />
              <button
                className="button"
                type="button"
                onClick={this.onAddButtonClicked}
              >
                Add
              </button>
            </div>
            <div className="image_container">
              <img
                className="image"
                alt="appointments"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              />
            </div>
          </div>
          <hr className="horizontal_line" />
          <div className="bottom_container_one">
            <h1 className="bottom_container_one_heading">Appointments</h1>
            <button
              className={starredButtonClass}
              type="button"
              onClick={this.starredMessages}
            >
              Starred
            </button>
          </div>
          <ul className="unList">{this.renderUnorderedList()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
