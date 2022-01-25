import listenTodoMessages from './consumers'


export const postBackUsersIds = async () => {
  try {
    await listenTodoMessages()
  } catch (error: any) {
    if(error.code === 'ERR_INVALID_ARG_TYPE') {
      throw new Error('Parâmetro inválido')
    }    
    throw error
  }
}