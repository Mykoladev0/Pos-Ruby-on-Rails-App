import Axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      Axios.post('https://postman-echo.com/post', body, {
        headers: {
          'content-type': 'application/json',
        },
      })
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((err) => {
        const statusCode: number = err.response?.status || 500;
        res.status(statusCode).json(err.response.data);
      });
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
