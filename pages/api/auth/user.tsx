import { withSessionRoute } from 'lib/withSession'
import { NextApiRequest, NextApiResponse } from 'next'
import ResponseError from 'Types/ResponseError'
import User from 'Types/User'

export default withSessionRoute(userRoute)
function userRoute (
  req: NextApiRequest,
  res: NextApiResponse<User | ResponseError>
) {
  const user = req.session.user
  if (user) {
    res.send(user)
  } else res.status(404).json({ message: 'utilisateur non trouvé' })
}
