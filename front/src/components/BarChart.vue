<template>
  <Bar
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,zoomPlugin);
export default {
  name: 'BarChart',
  components: { Bar },
   props: {
    chartOptions: {
      type: Object,
      default: () => {}
      }
      ,chartData: { 
        type: Object,
        required: true 
      }
  }, 
}
</script>