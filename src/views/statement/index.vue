<template>
  <div class="statement">
    <div class="sum">
      <div v-for="(item, index) in sumData" :key="index">
        <div class="title-line">
          <img :src="item.icon" />
          {{ item.title }}
        </div>
        <div class="people-num">{{ `${item.num}人` }}</div>
      </div>
    </div>

    <div class="chart">
      <div class="table invite">
        <div class="title-line">
          <div>列表一</div>
          <div>
            <el-date-picker
              v-model="inviteTimeArray"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="content">
          <div ref="inviteTable" style="height: 240px"></div>
          <div class="table-colors">
            <div v-for="item in inviteTableColor" :key="item.id">
              <div
                class="color-line"
                :style="{ backgroundColor: item.color }"
              />
              <div class="color-text">
                <div :style="{ backgroundColor: item.color }" />
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table funnel">
        <div class="title-line">
          <div>列表二</div>
          <div>
            <el-date-picker
              v-model="funnelTimeArray"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="content">
          <div ref="funnelRef" style="height: 240px"></div>
          <div class="table-colors">
            <div v-for="item in inviteFunnelObj" :key="item.id">
              <div
                class="color-line"
                :style="{ backgroundColor: item.color }"
              />
              <div class="color-text">
                <div :style="{ backgroundColor: item.color }" />
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart" style="margin: 24px 0">
      <div class="table resume" style="margin-right: 24px">
        <div class="title-line">
          <div>列表三</div>
          <div>
            <el-select v-model="resumeSelect.value" size="large" filterable>
              <el-option
                v-for="item in resumeSelect.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="content resume-content">
          <div class="list" v-for="item in resumeArray" :key="item.id">
            <div class="job">
              <text-tooltip :text="item.job">{{ item.job }}</text-tooltip>
            </div>
            <el-progress
              class="progress"
              :stroke-width="10"
              :show-text="false"
              :color="item.color"
              :percentage="item.match"
            />
            <div class="name">{{ `${item.name} ${item.match}%` }}</div>
          </div>
        </div>
      </div>

      <div class="table resume">
        <div class="title-line">
          <div>列表四</div>
          <div>
            <el-select v-model="jobSelect.value" size="large" filterable>
              <el-option
                v-for="item in jobSelect.options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="content resume-content">
          <div class="list" v-for="item in jobArray" :key="item.id">
            <div class="job">
              <text-tooltip :text="item.job">{{ item.job }}</text-tooltip>
            </div>
            <el-progress
              class="progress"
              :stroke-width="10"
              :show-text="false"
              :color="item.color"
              :percentage="item.match"
            />
            <div class="name">{{ `${item.name} ${item.match}%` }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart">
      <div class="table trend">
        <div class="title-line">
          <div>总列表</div>
          <div>
            <el-date-picker
              v-model="trend.timeArray"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY-MM-DD"
              valueFormat="YYYY-MM-DD"
            />
          </div>
        </div>
        <div class="content">
          <div>
            <el-button-group>
              <el-button
                @click="trend.btnActive = item.value"
                v-for="item in trend.btnOptions"
                :key="item.value"
                :class="{ btnActive: trend.btnActive === item.value }"
                plain
              >
                {{ item.label }}
              </el-button>
            </el-button-group>
          </div>
          <div ref="trendRef" style="height: 500px"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import IconSendOffer from '@/assets/images/login-code.png'
import { useUserStore } from '@/store/user'
import { getRandomNum, getAllDate, dateFormat } from '@/utils'
import {
  inviteTableColor,
  inviteTableOption,
  inviteFunnelObj,
  inviteFunnelOption,
  inviteOriginTrendOption
} from './charts-config'

const userStore = useUserStore()

onMounted(() => {
  drawInvite()
  drawFunnel()
  drawTrend()
})
const sumData = reactive({
  candidate: { title: '人数类别1', num: 10000, icon: IconSendOffer },
  interview: { title: '人数类别2', num: 20000, icon: IconSendOffer },
  sendOffer: { title: '人数类别3', num: 30000, icon: IconSendOffer },
  hire: { title: '总人数', num: 40000, icon: IconSendOffer }
})

// ----------------- 列表一 -----------------
const inviteTable = ref()
const inviteTimeArray = ref<any>([
  dateFormat(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
  dateFormat(new Date())
])
watch(
  () => inviteTimeArray.value,
  () => {
    drawInvite()
  }
)
function drawInvite() {
  let chartsDom = echarts.getInstanceByDom(inviteTable.value)
  if (!chartsDom) chartsDom = echarts.init(inviteTable.value)
  chartsDom.setOption(inviteTableOption)
}

// ----------------- 列表二 -----------------
const funnelRef = ref()
const funnelTimeArray = ref<any>([
  dateFormat(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
  dateFormat(new Date())
])
watch(
  () => funnelTimeArray,
  () => {
    drawFunnel()
  }
)
function drawFunnel() {
  let chartsDom = echarts.getInstanceByDom(funnelRef.value)
  if (!chartsDom) chartsDom = echarts.init(funnelRef.value)
  chartsDom.setOption(inviteFunnelOption)
}

// ----------------- 列表三 -----------------
type selectType = {
  value: string
  options: { value: string; label: string }[]
}
const resumeSelect = reactive<selectType>({
  value: '',
  options: []
})
const resumeColor = ref(['#5F89FF', '#D6A4FF', '#9395FD', '#FFCD7E', '#FD8989'])
const resumeArray = ref([
  {
    id: 1,
    job: '类型一',
    name: '张三',
    match: 50,
    color: resumeColor.value[0]
  },
  {
    id: 2,
    job: '类型二',
    name: '张三',
    match: 60,
    color: resumeColor.value[1]
  },
  {
    id: 3,
    job: '类型三',
    name: '张三',
    match: 70,
    color: resumeColor.value[2]
  },
  {
    id: 4,
    job: '类型四',
    name: '张三',
    match: 80,
    color: resumeColor.value[3]
  },
  {
    id: 5,
    job: '类型五',
    name: '张三',
    match: 20,
    color: resumeColor.value[4]
  }
])

// ----------------- 列表四 -----------------
const jobSelect = reactive<selectType>({
  value: '',
  options: []
})
const jobArray = ref([
  {
    id: 1,
    job: '类型一一一',
    name: '张三',
    match: 50,
    color: resumeColor.value[0]
  },
  {
    id: 2,
    job: '类型二',
    name: '张三',
    match: 60,
    color: resumeColor.value[1]
  },
  {
    id: 3,
    job: '类型三',
    name: '张三',
    match: 70,
    color: resumeColor.value[2]
  },
  {
    id: 4,
    job: '类型四',
    name: '张三',
    match: 80,
    color: resumeColor.value[3]
  },
  {
    id: 5,
    job: '类型五',
    name: '张三',
    match: 20,
    color: resumeColor.value[4]
  }
])

// ----------------- 总列表 -----------------
type trendType = {
  btnActive: string
  btnOptions: { value: string; label: string; color: string }[]
  timeArray: any
}
const trendRef = ref()
const trend = reactive<trendType>({
  btnActive: '1',
  btnOptions: [
    { value: '1', label: 'A人数', color: '#5F89FF' },
    { value: '2', label: 'B人数', color: '#0BDC9A' },
    { value: '3', label: 'C人数', color: '#D6A4FF' },
    { value: '4', label: 'D人数', color: '#9395FD' },
    { value: '5', label: 'E人数', color: '#FFCD7E' },
    { value: '6', label: 'F人数', color: '#FD8989' }
  ],
  timeArray: [
    dateFormat(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
    dateFormat(new Date())
  ]
})
watch([() => trend.timeArray, () => trend.btnActive], () => {
  drawTrend()
})
function drawTrend() {
  let chartsDom = echarts.getInstanceByDom(trendRef.value)
  if (!chartsDom) chartsDom = echarts.init(trendRef.value)
  chartsDom.setOption(
    inviteOriginTrendOption(
      getAllDate(trend.timeArray[0], trend.timeArray[1]),
      getAllDate(trend.timeArray[0], trend.timeArray[1]).map(() =>
        getRandomNum(500, 1000)
      ),
      trend.btnOptions.find(item => item.value === trend.btnActive)?.color || ''
    )
  )
}
</script>

<style lang="scss" scoped>
.statement {
  background-color: #f0f2f5;
  .sum {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    & > div {
      width: 266px;
      height: 120px;
      font-size: 24px;
      font-weight: 500;
      color: #1f2226;
      line-height: 32px;
      background: #ffffff;
      border-radius: 2px;
      border: 1px solid #e8e8e8;
      padding: 24px;
      .title-line {
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 500;
        color: rgba(31, 34, 38, 0.5);
        line-height: 24px;
        margin-bottom: 16px;
        img {
          width: 24px;
          height: 24px;
          margin-right: 16px;
        }
      }
      .people-num {
        margin-left: 40px;
      }
    }
  }
  .chart {
    display: flex;

    .table {
      background-color: #fff;
      .title-line {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56px;
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
        padding: 0 24px;
        border-bottom: 1px solid #e8e8e8;
      }
      .content {
        padding: 24px 32px;
        .table-colors {
          display: flex;
          align-items: center;
          margin-top: 24px;
          & > div {
            flex: 1;
            .color-line {
              height: 8px;
            }
            .color-text {
              display: flex;
              align-items: center;
              font-size: 12px;
              font-weight: 400;
              color: rgba(31, 34, 38, 0.8);
              line-height: 16px;
              margin-top: 8px;
              & > div:first-child {
                width: 8px;
                height: 8px;
                border-radius: 2px;
                margin-right: 8px;
              }
            }
          }
        }
      }
    }
  }
  .invite {
    flex: 1;
    height: 397px;
    margin-right: 24px;
    border-radius: 2px;
  }
  .funnel {
    flex: 1;
    height: 397px;
    border-radius: 2px;
  }
  .resume {
    flex: 1;
    // height: 397px;
    border-radius: 2px;
    .resume-content {
      .list {
        display: flex;
        align-items: center;
        height: 40px;
        .job {
          width: 64px;
          font-size: 16px;
          color: rgba(31, 34, 38, 0.5);
          line-height: 22px;
        }
        .progress {
          flex: 1;
          padding: 0 16px;
        }
        .name {
          width: 80px;
          font-size: 14px;
          font-weight: 500;
          color: #1f2226;
          line-height: 20px;
        }
      }
    }
  }
  .trend {
    width: 100%;
    .btnActive {
      border: 1px solid #409eff !important;
      color: #409eff;
      margin-right: 0;
    }
  }
}
</style>
