interface IToDo {
  id: string,
  name: string,
  description: string,
  done: boolean,
  user_id: string
}

interface IOneToDoResponse {
  id: string,
  name: string,
  description: string,
  done: boolean,
  user_id: string,
  user_name?: string,
  birthdate?: string
}

export{
  IToDo,
  IOneToDoResponse
}
