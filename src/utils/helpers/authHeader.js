function authHeader() {
  const token = localStorage.getItem('user-jwt-tk')

  return {
    headers: {
      token
    }
  }
}

export default authHeader
