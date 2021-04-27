const form = document.getElementById('signup_form')
const id = document.getElementById('signup_id_input')
const pwd = document.getElementById('signup_pwd_input')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  if (id.value && pwd.value) {
    console.log('ddd')
    const result = await axios.post('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/user', {
      id: id.value,
      pwd: pwd.value
    })
    if (result.data.code !== 200) {
      alert(result.data.message)
      id.value = ''
      pwd.value = ''
    } else {
      alert(result.data.message)
      window.location.href = 'http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:8080/signin'
    }
  }
})