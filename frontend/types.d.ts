interface ISignIn {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

interface IAuthUserData {
  username: string
  password: string
}

interface ITokenObtainPair {
  access: string
  refresh: string
}
