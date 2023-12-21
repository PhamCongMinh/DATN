export interface IChartData {
  points: number
  students: number
}

export interface IChart {
  scoreChartData?: IChartData[]
  correctAnswerChartData?: IChartData[]
  totalPointChartData?: IChartData[]
}
