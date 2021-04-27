const cookies = document.cookie.trim().split(';')

let userId
cookies.forEach(cookie => {
  const key = cookie.split('=')[0].trim()
  const value = cookie.split('=')[1]
  if (key === 'userId') {
    userId = value
  }
})

if (userId) {
  console.log(cookies)
  const date = new Date(1997-10-17)
  document.cookie = `userId=${userId}; expires=${date.toUTCString()}`
  alert('로그아웃 되었습니다.')
}

const form = document.getElementById('login_form')
const id = document.getElementById('login_id_input')
const pwd = document.getElementById('login_pwd_input')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (id.value && pwd.value) {
    const result = await axios.get(`http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/user/login?id=${id.value}&pwd=${pwd.value}`)
    if (result.data.code !== 200) {
      alert(result.data.message)
      id.value = ''
      pwd.value = ''
    } else {
      let date = new Date()
      date.setDate(date.getDate() + 1)
      document.cookie = `userId=${result.data.user.id}; expires=${date.toUTCString()}`
      window.location.href = 'http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:8080/room'
    }
  }
})