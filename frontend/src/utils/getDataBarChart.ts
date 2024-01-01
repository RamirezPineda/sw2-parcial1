
import type { ChartOptions } from 'chart.js';
import { IData } from '../interfaces/data.interface';

export const misOptionsBarChart: ChartOptions<'bar'> = {
  responsive: true,
  animation: false,
  plugins: {
    legend: {
      display: true,
      // text: "VENTAS TOTALES",
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Ganancias (Bs)',
        color: "rgba(53, 162, 235, 0.5)",
        font: {
          size: 14,
        },
      },
      // min: -25,
      // max: 100,
    },
    x: {
      title: {
        display: true,
        text: 'Horas',
        color: "rgba(53, 162, 235, 0.5)",
        font: {
          size: 14,
        },
      },
      // ticks: { color: "rgba(0, 220, 195)" },
      
    },
  },
};

const backgroundColor: string[] = [
  "rgba(255, 99, 132, 1)",
  "rgba(53, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(0, 128, 0, 1)",
  "rgba(70, 130, 180, 1)",
  "rgba(128, 0, 128, 1)",
  "rgba(255, 69, 0, 1)",
  "rgba(0, 0, 128, 1)",
];

const borderColor: string[] = [
  "rgba(255, 99, 132, 1)",
  "rgba(53, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(0, 128, 0, 1)",
  "rgba(70, 130, 180, 1)",
  "rgba(128, 0, 128, 1)",
  "rgba(255, 69, 0, 1)",
  "rgba(0, 0, 128, 1)",
];


// interface IDato { 
//   fecha_venta: string;
//   total_venta: number;
// }

export function getDataBarChart(datos: IData[]) {
  const labels = [
    "06:00 - 09:00",
    "09:00 - 12:00",
    "12:00 - 15:00",
    "15:00 - 18:00",
    "18:00 - 21:00",
    "21:00 - 23:59",
  ];

  const body = [0, 0, 0, 0, 0, 0, 0];

  datos.map((dato) => {
    const fechaDato = new Date(dato.fecha_venta);
    const horaDato = fechaDato.getHours();

    let fechaHoraInicio = new Date();
    fechaHoraInicio.setHours(7);
    let fechaHoraFin = new Date();
    fechaHoraFin.setHours(9);

    let horaInicio = fechaHoraInicio.getHours();
    let horaFin = fechaHoraFin.getHours();

    let inicio = 6;
    let fin = 9;
    let finMinutes = 0;

    for (let index = 0; index < body.length; index++) {
      if (horaDato >= horaInicio && horaDato < horaFin) {
        body[index] += dato.total_venta;
        break;
      }

      inicio += 3;
      fin += 3;
      fin = fin === 0 ? 23 : fin;
      finMinutes = fin === 23 ? 59 : 0;

      fechaHoraInicio = new Date();
      fechaHoraInicio.setHours(inicio);
      fechaHoraFin = new Date();
      fechaHoraFin.setHours(fin, finMinutes);

      horaInicio = fechaHoraInicio.getHours();
      horaFin = fechaHoraFin.getHours();
    }
  });

  // const labels = new Set(datos.map((dato) => dato.tipo_venta));
  // const body = [];

  // labels.forEach((label) => {
  //   console.log(label);
  //   let total = 0;
  //   datos.map((dato) => {
  //     if (dato.tipo_venta == label) {
  //       total += dato.total_venta;
  //     }
  //   });
  //   body.push(total);
  // });

  const datasets = [
    {
      label: "Venta total",
      data: body,
      backgroundColor,
      borderColor,
      borderWidth: 1,
      fill: true,
    },
  ];

  return { labels: [...labels], datasets };
}
