var user = new Vue({
  el: '#user',
  data: {
    users: [],
  },
  created() {
    const cookies = document.cookie.trim().split(';')

    let userId
    cookies.forEach(cookie => {
      const key = cookie.split('=')[0].trim()
      const value = cookie.split('=')[1]
      if (key === 'userId') {
        userId = value
      }
    })

    axios.get(`http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/user?userId=${userId}`)
      .then(resp => resp.data.userInfo)
      .then(users => {
        users.forEach(user => {
          const createDate = new Date(user.created_at)
          this.users.push({
            id: user.id,
            created_at: `${createDate.getFullYear()}-${createDate.getMonth()}-${createDate.getDate()}`,
            friendCount: user.friendCount,
            isFriend: user.isFriend
          })
        })
      })
  },
  methods: {
    sendFriend: async (event) => {
      const cookies = document.cookie.trim().split(';')

      let userId
      cookies.forEach(cookie => {
        const key = cookie.split('=')[0].trim()
        const value = cookie.split('=')[1]
        if (key === 'userId') {
          userId = value
        }
      })


      const targetId = event.target.id.split('__')[0]
      const result = await axios.post('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/friend', {
        from: userId,
        to: targetId
      })
      alert(result.data.message)
    }
  }
})