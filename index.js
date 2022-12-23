export const getId = () => {
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
export const displayTime = selectedtime => {
  const isTimeInteger = selectedtime == parseInt(selectedtime)
  const unixtime = isTimeInteger ? selectedtime : Date.parse(selectedtime["day"] + " " + selectedtime["month"] + " " + selectedtime["date"] + " " + selectedtime["year"] + " " + selectedtime["hour"] + ":" + selectedtime["minute"])
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currTime = new Date(Date.now()), currMonth = currTime.getMonth(), currDate = currTime.getDate(), currYear = currTime.getFullYear()
  const currentDate = Date.parse(months[currMonth] + " " + currDate + ", " + currYear + " 23:59")
  const time = parseInt(unixtime)
  const selectedTime = new Date(time), selectedMonth = selectedTime.getMonth(), selectedDate = selectedTime.getDate(), selectedYear = selectedTime.getFullYear()
  let hour = selectedTime.getHours(), minute = selectedTime.getMinutes(), period, date = selectedTime.getDate()
  let timeStr = "", timeheader = "", diff

  minute = minute < 10 ? '0' + minute : minute
  period = hour < 12 ? 'am' : 'pm'
  hour = hour > 12 ? 
    hour - 12 
    : 
    hour == 0 ? 12 : hour

  timeheader = "at " + hour + ":" + minute + " " + period

  if (time <= currentDate) { // today
    timeStr = "today " + timeheader
  } else { // after today
    if (time - currentDate <= 86340000) { // tomorrow
      timeStr = "tomorrow " + timeheader
    } else {
      if (time - currentDate < 604800000) { // next week
        if (selectedTime.getDay() > currTime.getDay()) {
          timeStr = "on " + days[selectedTime.getDay()] + " " + timeheader
        } else { // next week same day
          timeStr = "next " + days[selectedTime.getDay()] + " " + timeheader
        }
      } else { // next two weeks or more
        if (selectedTime.getDay() > currTime.getDay()) {
          timeStr = "next " + days[selectedTime.getDay()] + " " + timeheader
        } else {
          timeStr = "on " + days[selectedTime.getDay()] + ", " + months[selectedMonth] + " " + selectedDate + " " + timeheader
        }
      }
    }
  }

  return timeStr
}
export const displayPhonenumber = (oldValues, newValue, hideKeyboard) => {
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
export const resizePhoto = (info, maxw, maxh, focus) => {
  let { width, height } = info
  let newWidth, newHeight

  if (width > height) {
    newWidth = maxw
    newHeight = (maxw * height) / width

    if (newHeight > maxh) {
      newWidth = (maxh * newWidth) / newHeight
      newHeight = maxh
    }
  } else {
    newHeight = maxh
    newWidth = (maxh * width) / height

    if (newWidth > maxw) {
      newHeight = (maxw * newHeight) / newWidth
      newWidth = maxw
    }
  }

  if (focus != null) {
    width = newWidth
    height = newHeight

    if (focus == "width") {
      newWidth = maxw
      newHeight = (maxw * height) / width
    } else {
      newHeight = maxh
      newWidth = (maxh * width) / height
    }
  }

  return { width: newWidth, height: newHeight }
}
