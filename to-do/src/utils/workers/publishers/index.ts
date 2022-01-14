import RabbitmqServer from '../../../config/rabbitmq';


const publushiUsersMessages = async (message: any) => {  
  await RabbitmqServer.start()
  console.log('mandando usuario:', message)
  await RabbitmqServer.publishInQueue('user', JSON.stringify(message))    
}

export default publushiUsersMessages