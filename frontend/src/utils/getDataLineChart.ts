import type { ChartOptions } from 'chart.js';
import { IData } from '../interfaces';

export const misOptionsLineChart: ChartOptions<'line'> = {
  animations: {
    tension: {
      duration: 1000,
      easing: "linear",
      from: 0,
      to: 0.0,
      loop: false,
    },
  },
  scales: {
    y : {
      title: {
        display: true,
        text: 'Ganancias (Bs)',
        color: "rgba(53, 162, 235, 0.5)",
        font: {
          size: 14,
        },
      },
        // min : 0
    },
    x: {
      // ticks: { color: "rgb(255, 99, 132)" },
      title: {
        display: true,
        text: 'Fechas',
        color: "rgba(53, 162, 235, 0.5)",
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
      title: {
        display: true,
        text: "Ventas a lo largo del tiempo",
        font: {
          size: 14,
        },
      },
    },
    subtitle: {
      display: true,
      text: "Custom Chart Subtitle",
    },
  },
};


export function getDataLineChart(datos: IData[], fechaInicio: Date | undefined, fechaFin: Date | undefined) {
  const fechasLabels = labelsFechas(datos, fechaInicio, fechaFin);

  const fechaMinima = fechasLabels[0];
  const fechaMaxima = fechasLabels[2];

  const segmentosDeFechas = dividirRangoEnTresPartes(fechaMinima, fechaMaxima);

  const primerSegmento = segmentosDeFechas[0];
  const segundoSegmento = segmentosDeFechas[1];
  const tercerSegmento = segmentosDeFechas[2];

  const labels = [
    formatearFecha(primerSegmento.inicio),
    formatearFecha(segundoSegmento.inicio),
    formatearFecha(tercerSegmento.inicio),
    formatearFecha(tercerSegmento.fin),
  ];
  const body = [0, 0, 0, 0];

  datos.map((dato) => {
    const fechaVenta = new Date(dato.fecha_venta);
    if (
      fechaVenta >= primerSegmento.inicio &&
      fechaVenta < primerSegmento.fin
    ) {
      body[1] += dato.total_venta;
    }

    if (
      fechaVenta >= segundoSegmento.inicio &&
      fechaVenta < segundoSegmento.fin
    ) {
      body[2] += dato.total_venta;
    }

    if (
      fechaVenta >= tercerSegmento.inicio &&
      fechaVenta <= tercerSegmento.fin
    ) {
      body[3] += dato.total_venta;
    }
  });

  const datasets = [
    {
      label: "Ganancia ($)",
      data: body,
      tension: 0.5,
      fill: true,
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      pointRadius: 5,
      // pointBorderColor: "rgba(255, 99, 132)",
      // pointBackgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ];

  return { labels: [...labels], datasets };
}


function labelsFechas(datos: IData[], fechaInicio: Date | undefined, fechaFin: Date| undefined) {
  let fechaMinima: Date = new Date();
  let fechaMaxima: Date = new Date();

  if (!fechaInicio || !fechaFin) {
    fechaMinima = new Date(datos[0].fecha_venta);
    fechaMaxima = new Date(datos[0].fecha_venta);
  } else {
    fechaMinima = fechaInicio;
    fechaMaxima = fechaFin;
  }

  datos.forEach((objeto) => {
    const fecha = new Date(objeto.fecha_venta);

    if (fecha < fechaMinima) {
      fechaMinima = fecha;
    }

    if (fecha > fechaMaxima) {
      fechaMaxima = fecha;
    }
  });

  const valorNumericoMinimo = fechaMinima.getTime();
  const valorNumericoMaximo = fechaMaxima.getTime();
  const puntoMedioNumerico = (valorNumericoMinimo + valorNumericoMaximo) / 2;
  const fechaPuntoMedio = new Date(puntoMedioNumerico);

  return [fechaMinima, fechaPuntoMedio, fechaMaxima];
}

function dividirRangoEnTresPartes(fechaInicio: Date, fechaFin: Date) {
  const puntoMedio1 = new Date(
    fechaInicio.getTime() + (fechaFin.getTime() - fechaInicio.getTime()) / 3
  );
  const puntoMedio2 = new Date(
    fechaInicio.getTime() +
      (2 * (fechaFin.getTime() - fechaInicio.getTime())) / 3
  );

  const primerSegmento = { inicio: fechaInicio, fin: puntoMedio1 };
  const segundoSegmento = { inicio: puntoMedio1, fin: puntoMedio2 };
  const tercerSegmento = { inicio: puntoMedio2, fin: fechaFin };

  return [primerSegmento, segundoSegmento, tercerSegmento];
}

function formatearFecha(fecha: Date) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");

  return `${anio}-${mes}-${dia} ${horas}:${minutos}`;
}
