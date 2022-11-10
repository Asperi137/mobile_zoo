import type { NextApiRequest, NextApiResponse } from 'next'
import {animaux as data} from '../../../data/animaux'


export default function handler(req: NextApiRequest, res: NextApiResponse) {{
    return res.status(200).json(data)
  }
}
