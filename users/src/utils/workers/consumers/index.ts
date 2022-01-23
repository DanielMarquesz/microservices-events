import RabbitmqServer from '../../../config/rabbitmq';
import userRepository from '../../../repositories/user'

const listenTodoMessages = async () => {  
  let usuario
  await RabbitmqServer.start()
  setInterval(async () =>{    
    await RabbitmqServer.consumeQueue('todo', async (message) =>{
      console.log('[User] Consumindo ...')
      const result = JSON.parse(message.content.toString())      
      console.log(result)
      const id = result.task.user_id
      usuario = await userRepository.getByUserId(id)
      await RabbitmqServer.publishInQueue('user', JSON.stringify(usuario))

      console.log("[User] Publicado na de volta queue ", usuario)
    })    
  }, 100)
  
  return usuario
}

export default listenTodoMessages