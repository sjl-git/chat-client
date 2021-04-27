var user = new Vue({
  el: '#user',
  data: {
    friends: []
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
    console.log(userId)
    axios.get(`http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/friend?to=${userId}`)
      .then(resp => resp.data.friendInfo)
      .then(friends => {
        friends.forEach(friend => {
          const date = new Date(friend.createdAt)
          friend.createdAt = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        })
        this.friends = friends
      })
  },
  methods: {
    accept: async (event) => {
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
      const result = await axios.put('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/friend', {
        friendId: targetId
      }
      )
      console.log(result)
      alert(result.data.message)
      location.reload()
    },
    reject: async (event) => {
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
      const result = await axios.delete('http://ec2-13-209-18-10.ap-northeast-2.compute.amazonaws.com:3000/friend', {
        data: {
          friendId: targetId
        }
      }
      )
      console.log(result)
      alert(result.data.message)
      location.reload()
    },
  }
})