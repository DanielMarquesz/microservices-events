// import RabbitmqServer from '../../../config/rabbitmq';
// import userRepository from '../../../repositories/user'

// const listenTodoMessages = async () => {  
//   let usuario
//   await RabbitmqServer.start()
//   setInterval(async () =>{    
//     await RabbitmqServer.consumeQueue('todo', async (message) =>{
//       console.log('olhando...')
//       // @ts-ignore
//       const result = JSON.parse(message.content)      

//       const id = result.result.user_id
//       usuario = await userRepository.getByUserId(id)

//       // @ts-ignore
//       await RabbitmqServer.publishInQueue('user', JSON.stringify(usuario))

//       console.log("Enviado", usuario)      
//       return usuario 
//     })    
//   }, 1500)
//   await RabbitmqServer.closeChannel()
  
//   return usuario
// }

// export default listenTodoMessages