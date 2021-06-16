import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

interface Response {
  error: string
}
const subscribe = async (
  req: NextApiRequest,
  res: NextApiResponse<Response>
) => {
  const { email, locale } = req.body

  if (!email) {
    return res.status(400).json({ error: 'Email and name are required' })
  }

  try {
    await axios.post(
      'https://api.buttondown.email/v1/subscribers',
      { email },
      {
        headers: {
          Authorization: `Token ${
            locale && locale === 'es'
              ? process.env.BUTTONDOWN_ES
              : process.env.BUTTONDOWN_EN
          }`
        }
      }
    )
    return res.status(201).json({ error: '' })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const theError =
        error.response?.data.length > 0
          ? error.response?.data[0]
          : 'Unexpected error'
      return res.status(400).json({ error: theError })
    }
    return res.status(500).json({ error: error.message || error.toString() })
  }
}

export default subscribe
