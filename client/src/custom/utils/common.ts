import {
    copyMessage as _copyMessage
} from '../../utils/common'
import {
    checkLogin as _checkLogin,
    logout as _logout,
    refreshToken as _refreshToken
} from '../../utils/login'

import { request as _request } from "../../utils/axios";

// 复制文字
export const copyMessage = _copyMessage

// 检查是否登录
export const checkLogin = _checkLogin

// 退出登录
export const logout = _logout

// 刷新登录token
export const refreshToken = _refreshToken

// 请求方法
export const request = _request

/**
 * 通用API响应类型
 */
export interface ResponseData {
  code: number;
  errorMsg?: string;
  data?: any;
}

/**
 * 安全地处理API响应，处理noLoginError返回的情况
 * @param apiCall 执行API调用的异步函数
 * @returns 处理后的结果
 */
export const safeApiCall = async <T>(apiCall: () => Promise<any>): Promise<{ success: boolean; data?: T; error?: string }> => {
  try {
    const response = await apiCall() as ResponseData;
    
    if (response && response.code === 0 && response.data) {
      return { success: true, data: response.data as T };
    } else {
      return { success: false, error: response?.errorMsg || '请求失败' };
    }
  } catch (error: any) {
    console.error('API请求错误:', error);
    return { success: false, error: error?.message || '请求发生错误' };
  }
};

/**
 * 格式化日期为YYYY-MM-DD格式
 * @param date 日期对象
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 获取过去N天的日期
 * @param days 天数
 * @returns 过去N天的日期对象
 */
export const getPastDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};
