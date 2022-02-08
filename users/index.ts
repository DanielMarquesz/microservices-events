import { app } from './src/config/server'
import listenTodoMessages from './src/utils/workers/consumers/index'

app.listen(3000, () => {
  listenTodoMessages()
  console.log('The server is running on port 3000')
})
