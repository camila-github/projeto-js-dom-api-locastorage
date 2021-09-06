const containerReserva = document.querySelector('.container__reserva')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const btnReserva = document.getElementById('btnreserva')
const row = document.getElementsByClassName("row");

window.onload = () => showSeat(row);

function showSeat(rowEl) {
  for(let x = 0; rowEl[x]; x++){
    for (let i = 0; i < 10; i++) {
      let occupied = (Math.random() > 0.3) ? true : false; 
      
      if (occupied == true) {
        const seatEl = document.createElement('div')
        seatEl.classList.add('seat')
        rowEl[x].appendChild(seatEl)   
      
      }else{
        const seatEl = document.createElement('div')
        seatEl.classList.add('seat')
        seatEl.classList.add('occupied')
        rowEl[x].appendChild(seatEl)
      }
    }   
  }
}

// "+" is another way of converting the string to number instead of using parseInt
let ticketPrice = +movieSelect.value

// save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// update total and count
const updateSelectedCount = () => {
  
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length

  console.log(total)

  const seatIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// Get data from localStorage and populate UI
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) seat.classList.add('selected')      
    })
  }
  
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if (selectedMovieIndex !== null) movieSelect.selectedIndex = selectedMovieIndex
}

// Movie select ecent
populateUI()
movieSelect.addEventListener('change', (e) => {
  ticketPrice = e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

containerReserva.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
})

btnReserva.addEventListener('click', () => alert(`O filme selecionado foi reservado com sucesso!!`))

// initial count and total seats
updateSelectedCount()


const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.querySelector('.container')

open.addEventListener('click', () => container.classList.add('show-nav'))
close.addEventListener('click', () => container.classList.remove('show-nav'))


