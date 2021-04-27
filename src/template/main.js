const firstRoomId = document.getElementById('first_room_id')
const firstRoomUserCnt = document.getElementById('first_room_user_cnt')
let [firstRoomBtn] = document.getElementsByClassName('first_room_btn')

const secondRoomId = document.getElementById('second_room_id')
const secondRoomUserCnt = document.getElementById('second_room_user_cnt')
const [secondRoomBtn] = document.getElementsByClassName('second_room_btn')

axios.get(`http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/room`)
  .then(result => result.data.channels)
  .then(channels => {
    console.log(channels)
    firstRoomId.innerHTML = channels[0].roomId
    firstRoomUserCnt.innerHTML = channels[0].count
    firstRoomBtn.id = channels[0].roomId
    secondRoomId.innerHTML = channels[1].roomId
    secondRoomUserCnt.innerHTML = channels[1].count
    secondRoomBtn.id = channels[1].roomId
  })

let date = new Date()
date.setDate(date.getDate() + 1)

firstRoomBtn.addEventListener('click', async () => {
  console.log('click')
  console.log(firstRoomBtn.id)

  const result = await axios.put('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/user/enter', {
    userId,
    roomId: firstRoomBtn.id
  })
  if (result.data.code === 200) {

    document.cookie = `roomId=${firstRoomBtn.id}; expires=${date.toUTCString()}`
    window.location.href='http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:8080/channel'
  }
  else
    alert(result.data.message)
})

secondRoomBtn.addEventListener('click', async () => {
  console.log('click')
  console.log(secondRoomBtn.id)
  const result = await axios.put('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/user/enter', {
    userId,
    roomId: secondRoomBtn.id
  })
  if (result.data.code === 200) {
    document.cookie = `roomId=${secondRoomBtn.id}; expires=${date.toUTCString()}`
    window.location.href='http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:8080/channel'
  }
  else
    alert(result.data.message)
})
