import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { IChartData } from '../../../../../../../../../../../../types/chart'

interface IProps {
  data?: IChartData[]
}

const StudentAchievementChart: React.FC<IProps> = (props): JSX.Element => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={props?.data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="points" type="number" label={{ value: 'points', position: 'insideBottom', offset: -5 }} />
        <YAxis label={{ value: 'students', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        {/*<Legend />*/}
        <Bar dataKey="students" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StudentAchievementChart
