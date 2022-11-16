import { NextApiRequest, NextApiResponse } from 'next/types'
import bcrypt from 'bcrypt'
import ResponseError from '../Types/ResponseError'
import User from '../Types/User'
import UserM from '../models/user'
import jsonwebtoken from 'jsonwebtoken'

export function signup (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new UserM({
        login: req.body.login,
        password: hash,
        role: req.body.role
      })
      user
        .save()
        .then(() => res.status(201).json({ message: 'user créé ' }))
        .catch((error: ResponseError) => res.status(400).json(error))
    })
    .catch((error: ResponseError) => res.status(500).json(error))
}

export function login (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError | any>
) {
  UserM.findOne({ login: req.body.login })
    .then(user => {
      if (user === null) {
        res.status(401).json({ message: 'login/password incorrecte' })
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              res.status(401).json({ message: 'login/password incorrecte' })
            } else
              res.status(200).json({
                userId: user._id,
                token: jsonwebtoken.sign(
                  { userID: user._id },
                  'RANDOM_TOKEN_SECRET',
                  { expiresIn: '24h' }
                )
              })
          })
          .catch((error: ResponseError) => res.status(500).json(error))
      }
    })
    .catch((error: ResponseError) => res.status(500).json(error))
}
