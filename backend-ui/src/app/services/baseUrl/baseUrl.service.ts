import { QueryBaseUrl } from "../data/queries"

/**
 * Not intenteded to be used inside an Angular
 * APP but in it's bootstraping process
 */
export class BaseUrlService {
    baseUrl: string
    constructor() { }

    httpOptions(data: any) {
      return  {
        headers: {
          'Content-Type':  'application/json',
          responseType: 'json',
        },
        method: 'POST',
        body: data
      }
    }

    async fetchBaseUrl() {
        const {
            query,
        } = QueryBaseUrl()

        const { 
          data: {
            baseUrl
        } } = await (await fetch('graphql', this.httpOptions(JSON.stringify({ query })))).json()

        this.baseUrl = baseUrl

        return baseUrl
    }

    getBaseUrl() {
        return this.baseUrl
    }
}

