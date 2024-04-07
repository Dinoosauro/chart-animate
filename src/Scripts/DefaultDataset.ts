/**
 * Default config for new datasets
 */
export let defaultDataset = {
    borderWidth: 1,
    backgroundColor: getComputedStyle(document.body).getPropertyValue("--accent"),
    borderRadius: 25,
    fill: false,
    data: [],
    axis: "y"
}
