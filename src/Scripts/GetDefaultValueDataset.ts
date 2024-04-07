import { ChartDataset, LineOptions } from "chart.js";

interface GetDataset {
  line: number,
  prop: keyof ChartDataset | keyof LineOptions
  returnString?: boolean
}
/**
 * Get the default value of a dataset
 * @param line the number of the dataset array
 * @param prop the property to fetch from the chart dataset array
 * @param returnString if a string should be returned
 * @returns An array, a string or undefined, that correspnonds to the default value
 */
export default function getDefaultValueDataset({ line, prop, returnString }: GetDataset) {
  if (!window.chartGet?.data?.datasets || !window.chartGet?.data?.datasets[line]) return "";
  // @ts-ignore
  const output = window.chartGet.data.datasets[line][prop] ?? "";
  return returnString ? output.toString() : output === "" ? [] : output;
}
