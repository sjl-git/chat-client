const cookies = document.cookie.trim().split(';')

let userId

cookies.forEach(cookie => {
  const key = cookie.split('=')[0].trim()
  const value = cookie.split('=')[1]
  if (key === 'userId') {
    userId = value
  }
})

if (!userId) {
  alert('로그인이 필요합니다.')
  window.location.href = 'http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:8080/signin'
}