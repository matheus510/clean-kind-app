export interface LoadCreatureById {
  load: (id: string) => Promise<LoadCreatureById.Result>
}

export namespace LoadCreatureById {
  export type Result = {
    name: string
  }
}
