import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userRepository from '../../../repositories/user/index'

class Auth {
  async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10)
    return hash
  }

  async comparePassword(password: string, email: string) {
    const user = await userRepository.getByEmail(email)
    const result = await bcrypt.compare(password, user.password)
    if(!result){
      return 'Authentication failed'
    }
    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_TIME }
    )
    return token
  }
}

export default new Auth
