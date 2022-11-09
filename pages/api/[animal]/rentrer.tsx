import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  text: string
  param: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  res.status(200).json({ text: 'Post pour rentrer un animal' ,
  param : 'id de l’espèce' })
}

