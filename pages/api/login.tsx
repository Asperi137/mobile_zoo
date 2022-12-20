import { NextApiRequest, NextApiResponse } from 'next'
import User from 'Types/User'
import ResponseError from 'Types/ResponseError'
import { withSessionRoute } from 'lib/withSession'
import apiConnect from 'lib/apiConnect'

export default withSessionRoute(loginRoute)

async function loginRoute (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  return new Promise((resolve, reject) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST')

    if (req.method === 'POST') {
      login(req, res)
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  })
}

async function login (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError | any>
) {
  let body = req.body
  if (typeof body === 'string') {
    body = JSON.parse(req.body)
  }
  console.log(body.login)
  const data = {
    login: body.login,
    password: body.password
  }
  const JSONdata = JSON.stringify(data)
  const endpoint = `${apiConnect()}auth/login`
  const options = {
    method: 'POST',
    body: JSONdata
  }

  fetch(endpoint, options)
    .then(res => res.json())
    .then(async response => {
      req.session.user = {
        login: req.body.login,
        password: '',
        role: response.role
      }
      await req.session.save()
      res.status(200).json({
        login: login,
        role: response.role
      })
    })
    .catch((error: ResponseError) => res.status(500).end(error))

  return res
}
