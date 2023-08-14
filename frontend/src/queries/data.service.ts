export class DataService {

  static self: DataService;

  static factory(): DataService {
    if (!DataService.self) {
      DataService.self = new DataService();
    }
    return DataService.self;
  }

  httpOptions(data: any) {
    return  {
      headers: {
        'Content-Type':  'application/json',
        // 'Authorization': 'my-auth-token'
        responseType: 'json',
      },
      method: 'POST',
      body: data
    }
  }

  url: string = 'graphql'

  readData(readQuery: string, vars: any = {}): any {
    return this.query(readQuery, vars)
  }

  setData(mutateQuery: string, vars: any = {}): any {
    return this.mutation(mutateQuery, vars)
  }

  execute = async (type: 'query' | 'mutation', query: string, vars: any = {}): Promise<any> => {
    if (type === 'query' || type === 'mutation') {
      const response = await fetch(
        this.url,
        this.httpOptions(JSON.stringify({ query, variables: vars }))
      );
      if (!response.ok) return null
      return await response.json();
    } else {
      throw new Error(`Unsupported GraphQL query type: ${type}`)
    }
  }

  query = (query: string, vars: any = {}): any => {
    return this.execute('query', query, vars)
  }

  mutation = (mutation: string, vars: any = {}): any => {
    return this.execute('mutation', mutation, vars)
  }
}
