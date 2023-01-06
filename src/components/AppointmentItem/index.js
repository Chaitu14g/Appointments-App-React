import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachItem, imageStarredClicked} = props
  const {id, firstInput, secondInput, isStarred} = eachItem
  const time = format(new Date(secondInput), 'dd MMMM yyyy, EEEE')
  const imageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const imageStarred = () => {
    imageStarredClicked(id)
  }

  return (
    <li className="appointmentItemContainer">
      <div className="appointmentItemContainerText">
        <p className="appointmentItemContainerTextHeading">{firstInput}</p>
        <p className="appointmentItemContainerTextPara">Date: {time}</p>
      </div>
      <button
        type="button"
        className="appointmentItemContainerButton"
        onClick={imageStarred}
        id="star"
      >
        <img alt="star" className="star_image" src={imageUrl} />
      </button>
    </li>
  )
}

export default AppointmentItem
