import type { ChartData, ChartOptions } from 'chart.js';


export interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}