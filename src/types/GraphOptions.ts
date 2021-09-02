interface YValues {
  data: number[]
  name: string
  color: string
  type: string
}

export interface GraphOptions {
  x: string[] | number[]
  y: YValues[]
  title: string
  stacking: string
}

export interface AB {
  x: any[]
  y: { data: number[]; name: string; color: string; type: string }[]
  title: string
  stacking: string
}
