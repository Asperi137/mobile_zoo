import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  text: string
  param: [string, string]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>){
  res.status(200).json({ text: 'Post pour sortir les annimaux' ,
  param : ['id de l’espèce',
  'tableau des id des animaux qui ne rentrent pas'] })
}

