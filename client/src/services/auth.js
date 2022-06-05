import { PROD_API } from '../utils/api'
import { DEFAULT_HEADERS } from '../utils/headers'

export const authenticate = async (url, data) => {
  const token = await fetch(`${PROD_API}/${url}`, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(data)
  })
  return await token.json();
}