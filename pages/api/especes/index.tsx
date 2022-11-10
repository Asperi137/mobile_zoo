import type { NextApiRequest, NextApiResponse } from 'next'
import {especes as data} from '../../../data/especes'


export default function handler(req: NextApiRequest, res: NextApiResponse) {{
    return res.status(200).json(data)
  }
}