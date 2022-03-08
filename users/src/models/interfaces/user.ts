interface IUser {
  email: string,
  full_name: string,
  birthdate: string,
  password: string
}

interface IOneUser {
  id: string,
  email: string,
  full_name: string,
  birthdate: string,
  password: string
}

interface IUsers {
  results: IOneUser[],
}

export {
  IUser,
  IUsers,
  IOneUser
}
