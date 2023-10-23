export interface ApiResponse {
  readonly success: boolean,
  readonly data?: any,
  readonly message: string,
  readonly _execution_time: number
}
