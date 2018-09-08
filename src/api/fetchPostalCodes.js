import debounce from 'debounce-fn'
import { fetchJson } from './api-helpers'
import { red } from 'logger'

/* Dev */
// eslint-disable-next-line
import { pink } from 'logger'

const fetchPostalCodes = debounce(

  async (searchString) => {
    pink('FETCH')
    try {
      const data = await fetchJson(
        `/location/postal-codes/${searchString}`,
        {
          method: 'GET',
          body: JSON.strinify
        }
      )
      return data.data
    }
    catch (e) {
      red('api.postalCodes.read', e)
    }
  },
  {
    wait: 200,
    immediate: true,
  }
)

export default fetchPostalCodes