import type { ChartData, ChartOptions } from 'chart.js';


export interface PieProps {
  options: ChartOptions<'pie'>;
  data: ChartData<'pie'>;
}