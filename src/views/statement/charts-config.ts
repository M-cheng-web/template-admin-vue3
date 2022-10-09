import * as echarts from 'echarts'

// -------------- 列表一 --------------
export const inviteTableColor = [
  { id: 1, title: '类型一', color: '#0D65F7' },
  { id: 2, title: '类型二', color: '#4A8CF9' },
  { id: 3, title: '类型三', color: '#86B2FB' },
  { id: 4, title: '类型四', color: '#C2D8FD' }
]

export const inviteTableOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b}{a} : {c}人',
    borderColor: '#000',
    backgroundColor: 'rgba(0,0,0,0.75)',
    textStyle: {
      color: '#FFFFFF'
    }
  },
  xAxis: {},
  yAxis: {
    data: ['A', 'B', 'C', 'D', 'E']
  },
  grid: {
    top: 0,
    bottom: 0,
    right: 0,
    left: '12%'
  },
  series: [
    {
      type: 'bar',
      data: [6210, 2000, 3600, 1000, 200],
      stack: '堆叠',
      name: '类型一',
      itemStyle: {
        color: inviteTableColor[0].color, //柱子颜色
        opacity: 1,
        borderRadius: 1
      }
    },
    {
      type: 'bar',
      data: [610, 200, 300, 100, 20],
      stack: '堆叠',
      name: '类型二',
      itemStyle: {
        color: inviteTableColor[1].color, //柱子颜色
        opacity: 1,
        borderRadius: 1
      }
    },
    {
      type: 'bar',
      data: [610, 200, 300, 100, 20],
      stack: '堆叠',
      name: '类型三',
      itemStyle: {
        color: inviteTableColor[2].color, //柱子颜色
        opacity: 1,
        borderRadius: 1
      }
    },
    {
      type: 'bar',
      data: [610, 200, 300, 100, 20],
      stack: '堆叠',
      name: '类型四',
      itemStyle: {
        color: inviteTableColor[3].color, //柱子颜色
        opacity: 1,
        borderRadius: [0, 10, 10, 0]
      }
    }
  ]
}

// -------------- 招聘漏斗 --------------
export const inviteFunnelObj = reactive([
  { id: 1, value: 10, title: '类型一', color: '#5F89FF' },
  { id: 2, value: 200, title: '类型二', color: '#0BDC9A' },
  { id: 3, value: 80, title: '类型三', color: '#D6A4FF' },
  { id: 4, value: 10, title: '类型四', color: '#9395FD' },
  { id: 5, value: 40, title: '类型五', color: '#FFCD7E' },
  { id: 6, value: 100, title: '类型六', color: '#FD8989' }
])

export const inviteFunnelOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c}人 {d}%',
    borderColor: '#000',
    backgroundColor: 'rgba(0,0,0,0.75)',
    textStyle: {
      color: '#FFFFFF'
    }
  },
  grid: {
    top: 0,
    bottom: 0,
    right: 0,
    left: '12%'
  },
  series: [
    {
      type: 'funnel',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      min: 0,
      max: 100,
      minSize: '0%',
      maxSize: '100%',
      sort: 'descending',
      gap: 0,
      label: {
        show: false,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 2
      },
      emphasis: {
        label: {
          fontSize: 16
        }
      },
      data: inviteFunnelObj.map(item => ({
        value: item.value,
        name: item.title,
        itemStyle: { color: item.color }
      }))
    }
  ]
}

// -------------- 整体趋势 --------------
export const inviteOriginTrendOption = (
  xdata: string[],
  data: number[],
  color: string
) => ({
  tooltip: {
    trigger: 'axis',
    borderColor: '#000',
    backgroundColor: 'rgba(0,0,0,0.75)',
    axisPointer: {
      lineStyle: {
        color
      }
    },
    textStyle: {
      color: '#FFFFFF'
    },
    formatter: '{b} <br/> 新增: {c}人'
  },
  grid: {
    top: 50,
    bottom: 100,
    right: 76,
    left: 76
  },
  color: [color],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: xdata
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%']
  },
  // 缩放
  dataZoom: [
    // {
    //   type: 'inside',
    //   start: 0,
    //   end: 10
    // },
    {
      start: 0,
      end: 100
    }
  ],
  series: [
    {
      type: 'line',
      data,
      smooth: true,
      showSymbol: false,
      symbol: 'emptyCircle',
      symbolSize: 10,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color },
          { offset: 1, color: '#fff' }
        ])
      }
    }
  ]
})
