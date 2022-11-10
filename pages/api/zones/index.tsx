import type { NextApiRequest, NextApiResponse } from 'next'
import {zones as data} from '../../../data/zones'


export default function handler(req: NextApiRequest, res: NextApiResponse) {{
    return res.status(200).json(data)
  }
}