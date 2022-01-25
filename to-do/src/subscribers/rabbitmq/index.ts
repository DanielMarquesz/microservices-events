import { 
  Connection,
  Channel,
  connect,
  Message,
  Replies
} from 'amqplib'

class RabbitmqServer {
  private conn: Connection
  private channel: Channel

  constructor(private uri: string){}

  async start(): Promise<void>{
    this.conn = await connect(this.uri)
    this.channel = await this.conn.createChannel()
  }

  async publishInQueue(queue: string, message: string): Promise<boolean> {
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async publishInExchangeQueue(
    exchange: string,
    routingKey: string,
    message: string):Promise<boolean>{
      return this.channel.publish(
        exchange,
        routingKey,
        Buffer.from(message)
      )
  }

  async consumeQueue(queue: string, callback: (message: Message) => void): Promise<Replies.Consume>{
    return this.channel.consume(queue, (message) => {      
      callback(message)
      this.channel.ack(message)
      this.channel.close()     
    })
  }

  async closeChannel(): Promise<void> {
    await this.conn.close
  }
}

export default new RabbitmqServer(process.env.RABBIT_MQ_URI)