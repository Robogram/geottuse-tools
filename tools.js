const getId = () => {
  let letters = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"
  ]
	let id_length = Math.floor(Math.random() * (15 - 10)) + 10
  let id = ""

  for (let k = 0; k < id_length; k++) {
    id += "" + (
      k % 2 == 0 ? 
        letters[Math.floor(Math.random() * letters.length)].toUpperCase()
        :
        Math.floor(Math.random() * 9) + 0
    )
  }

	return id
}
const displayTime = unixtime => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currTime = new Date(Date.now())
  const currentDate = Date.parse(months[currTime.getMonth()] + " " + currTime.getDate() + ", " + currTime.getFullYear() + " 23:59")
  const time = parseInt(unixtime)
  const selectedDate = new Date(time)
  let hour = selectedDate.getHours(), minute = selectedDate.getMinutes(), period, date = selectedDate.getDate()
  let timeStr = "", timeheader = "", diff

  minute = minute < 10 ? '0' + minute : minute
  period = hour < 12 ? 'am' : 'pm'
  hour = hour > 12 ? 
    hour - 12 
    : 
    hour == 0 ? 12 : hour

  timeheader = hour + ":" + minute + " " + period

  if (time < currentDate) {
    timeStr = "today at " + timeheader
  } else if (time > currentDate) {
    if (time - currentDate > 86400000) {
      diff = time - currentDate

      if (diff <= 604800000) { // this week
        let sDay = new Date(time)
        let eDay = new Date(currentDate)

        timeStr = " on " + days[sDay.getDay()] + " at " + timeheader
      } else if (diff > 604800000 && diff <= 1210000000) { // next week
        let sDay = new Date(time)
        let eDay = new Date(currentDate)

        timeStr = " next " + days[sDay.getDay()] + " at " + timeheader
      } else {
        let sDay = new Date(time)
        let eDay = new Date(currentDate)

        timeStr = " on " + days[sDay.getDay()] + ", " + months[sDay.getMonth()] + " " + date + " at " + timeheader
      }
    } else {
      timeStr = "tomorrow at " + timeheader
    }
  }

  return timeStr
}
const displayPhonenumber = (oldValues, newValue, hideKeyboard) => {
  let newValues = ""

  if (oldValues.length - newValue.length == 1) {
    newValues = newValue
  } else {
    for (let k = 0; k < newValue.length; k++) {
      newValues += newValue.substr(k, 1) >= "0" && newValue.substr(k, 1) <= "9" ? newValue.substr(k, 1) : ""
    }

    if (newValues.length == 10) { // 1231231234
      newValues = "(" + newValues.substr(0, 3) + ") " + newValues.substr(3, 3) + "-" + newValues.substr(6, 4)

      hideKeyboard()
    } else if (newValues.length >= 1 && newValues.length <= 6) {
      newValues = "(" + newValues.substr(0, 3) + ") " + newValues.substr(3, 3)
    } else if (newValues.length >= 6 && newValues.length <= 10) {
      newValues = "(" + newValues.substr(0, 3) + ") " + newValues.substr(3, 3) + "-" + newValues.substr(6, 4)
    }
  }

  return newValues
}
const resizePhoto = (info, width) => {
  let s_width = info.width, s_height = info.height
  let photo_width = width

  return {
    width: photo_width,
    height: (photo_width * s_height) / s_width
  }
}

module.exports = { getId, displayTime, displayPhonenumber, resizePhoto }
