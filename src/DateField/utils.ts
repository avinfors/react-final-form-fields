import addMonths from "date-fns/addMonths";
import addYears from "date-fns/addYears";
import endOfMonth from "date-fns/endOfMonth";
import endOfWeek from "date-fns/endOfWeek";
import endOfYear from "date-fns/endOfYear";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import formatDate from "date-fns/format";
import getMonths from "date-fns/getMonth";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isDate from "date-fns/isDate";
import isEqual from "date-fns/isEqual";
import isToday from "date-fns/isToday";
import isValid from "date-fns/isValid";
import parse from "date-fns/parse";
import setMonths from "date-fns/setMonth";
import setYear from "date-fns/setYear";
import startOfDay from "date-fns/startOfDay";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import startOfYear from "date-fns/startOfYear";
import subMonths from "date-fns/subMonths";
import subYears from "date-fns/subYears";
import { ru } from "date-fns/locale";

export const format = (date: Date | number, to = "dd.MM.yyyy"): string =>
  formatDate(date, to, { locale: ru });

export const getInitialMonth = (
  value: Date | number,
  defaultDate: Date | number
): Date => (isDate(value) ? startOfDay(value) : startOfDay(defaultDate));

export const getInitialDate = (value: Date | number): Date | undefined =>
  isDate(value) ? startOfDay(value) : undefined;

export const getDefaultDate = (): Date => startOfDay(new Date());

export const getMinDate = (years: number): Date =>
  startOfDay(subYears(startOfDay(new Date()), years));

export const getMaxDate = (years: number): Date =>
  startOfDay(addYears(startOfDay(new Date()), years));

export {
  addMonths,
  addYears,
  endOfMonth,
  endOfWeek,
  endOfYear,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  formatDate,
  getMonths,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isDate,
  isEqual,
  isToday,
  isValid,
  parse,
  setMonths,
  setYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
  subYears,
};
