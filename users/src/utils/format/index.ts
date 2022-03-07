

class Format {

  responseGet(results: any[]){
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

  responseGetOne(result: any){
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
