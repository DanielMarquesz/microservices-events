import listenTodoMessages from './consumers'
import publushiUsersMessages from './publishers'


export const postBackUsersIds = async () => {
  try {
    const messages = await listenTodoMessages()
    await publushiUsersMessages(messages)
  } catch (error: any) {

    if(error.code === 'ERR_INVALID_ARG_TYPE') {
      throw new Error('Parâmetro inválido')
    }
    
    throw error
  }
}