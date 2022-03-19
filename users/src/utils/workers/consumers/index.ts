import RabbitmqServer from '../../../config/rabbitmq'
import userRepository from '../../../repositories/user'

const listenTodoMessages = async () => {
  let usuario
  await RabbitmqServer.start()
  setInterval(async () =>{
    await RabbitmqServer.consumeQueue('todo-queue', async (message) =>{
      try {
        const result = JSON.parse(message.content.toString())
        const id = result.task.user_id
        usuario = await userRepository.getById(id)
        await RabbitmqServer.publishInQueue('users-queue', JSON.stringify(usuario))
      } catch (error) {
        await RabbitmqServer.publishInQueue('users-queue', JSON.stringify(0))
      }
    })
  }, 100)

  return usuario
}

export default listenTodoMessages
