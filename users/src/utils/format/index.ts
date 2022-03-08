import {
  IOneUser
} from '../../models/interfaces/user'

class Format {

  // @ts-ignore
  responseGet(results: unknown){
    //@ts-ignore
    const formated = results.map((item) =>{
      const {
        id,
        full_name,
        birthdate,
        email
      } = item
      return {
        id,
        full_name,
        birthdate,
        email
      }
    })

    return formated
  }

  responseGetOne(result: IOneUser){
    const {
      id,
      full_name,
      birthdate,
      email
    } = result
    return {
      id,
      full_name,
      birthdate,
      email
    }
  }
}

export default new Format()
