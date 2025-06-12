import { BaseService } from '../base/base.service'
import { ApiResponse } from '../../types/response.types'

import {
  HeatMapData
} from './types'

export class HeatmapService extends BaseService<HeatMapData> {
  constructor() {
    super('/heatmap')
  }

  // Получение heatmap
  async getHeatMap(): Promise<ApiResponse<HeatMapData>> {
    console.log("Debug-heatmap: Делаем запрос на heatmap")
    const response = await this.get()
    console.log('Debug-heatmap: Raw Project API response:', response)
    return response
  }
}