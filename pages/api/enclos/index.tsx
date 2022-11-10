import type { NextApiRequest, NextApiResponse } from 'next'
import {enclos as data} from '../../../data/enclos'


export default function handler(req: NextApiRequest, res: NextApiResponse) {{
    return res.status(200).json(data)
  }
}