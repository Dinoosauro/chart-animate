import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Card from "./Components/Card";
import DataContainer from "./Components/DataContainer";
import Header from "./Components/Header";
import { Chart, ChartConfiguration, ChartDataset, ChartTypeRegistry, LineOptions, scales } from 'chart.js';
import Canvas from "./Components/Canvas";
import Sections from "./Components/Sections";
import { createRoot } from "react-dom/client";
import Download from "./Components/Download";
import { CanvasState, ExportGlobal, MainState } from "./Interface/Interfaces";
import { defaultDataset } from "./Scripts/DefaultDataset";
import updateValueDataset from "./Scripts/UpdateValueDataset";
import SectionData from "./Tabs/Data";
import getDefaultValueDataset from "./Scripts/GetDefaultValueDataset";
import SectionColor from "./Tabs/Color";
import SectionLine from "./Tabs/Line";
import SectionGlobal from "./Tabs/Global";
import SectionTension from "./Tabs/Tension";
import applyGlobal from "./Scripts/ApplyGlobal";
import SectionFont from "./Tabs/Font";
import SectionGrid from "./Tabs/Grid";
import SectionAnimation from "./Tabs/Animation";
import applyTheme from "./Scripts/ApplyTheme";
import SectionExport from "./Tabs/Export";
import SectionFill from "./Tabs/Fill";

export default function App() {
  let [state, updateState] = useState<MainState>({
    action: "data",
    line: 0,
    type: "line"
  });
  /**
   * The actions available in the "Section" scroll node
   */
  let actionList = [{
    displayedName: "Data",
    id: "data"
  },
  {
    displayedName: "Colors",
    id: "color"
  },
  {
    displayedName: "Line style",
    id: "line"
  },
  {
    displayedName: "Font style",
    id: "font"
  },
  {
    displayedName: "Grid style",
    id: "grid"
  },
  {
    displayedName: "Fill style",
    id: "fill"
  },
  {
    displayedName: "Loading animation",
    id: "loadinganimation"
  },
  ]
  if (state.type === "line" || state.type === "radar") actionList.push({ displayedName: "Tension options", id: "tension" })
  actionList.push({ // These two options must be at the end
    displayedName: "Entire chart options",
    id: "global"
  },
    {
      displayedName: "Export",
      id: "export"
    }
  );
  useLayoutEffect(() => {
    localStorage.getItem("ChartAnimate-Theme") === "a" && applyTheme(true);
    applyGlobal();
  }, [])
  return <>
    <Header></Header><br></br>
    <Card type={0}>
      <div className="flex intelliFlex">
        <div>
          <Card type={1}>
            <Canvas></Canvas>
          </Card>
        </div>
        <div key={`ChartAnimate-MainOptionContainer-${state.line}`}>
          <h2>Chart options:</h2>
          <select defaultValue={state.line} onChange={(e) => { // Switch datasets: add a new defualt dataset. Later an array is created from each dataset, and mapped to be an option
            let value = +(e.target as HTMLSelectElement).value;
            if (isNaN(value)) {
              window.chartUpdate(prevState => {
                prevState.datasets[prevState.datasets.length] = defaultDataset;
                value = prevState.datasets.length;
                return { ...prevState, date: Date.now() };
              });
            }
            updateState(prevState => { return { ...prevState, line: isNaN(value) ? prevState.line + 1 : value } })
          }}>
            {Array(Array.from(window.chartGet?.data?.datasets ?? []).length + 1).fill("").map((v, i) => <option value={i}>Dataset {i}</option>)}
            <option value={"new"}>Create new dataset</option>
          </select>
          <Sections callback={(a) => updateState(prevState => { return { ...prevState, action: a } })} list={actionList}></Sections><br></br>
          {state.action === "data" ? <SectionData line={state.line}></SectionData> :
            state.action === "color" ? <SectionColor line={state.line}></SectionColor> :
              state.action === "line" ? <SectionLine line={state.line}></SectionLine> :
                state.action === "global" ? <SectionGlobal updateState={updateState}></SectionGlobal> :
                  state.action === "tension" ? <SectionTension></SectionTension> :
                    state.action === "font" ? <SectionFont></SectionFont> :
                      state.action === "grid" ? <SectionGrid></SectionGrid> :
                        state.action === "fill" ? <SectionFill line={state.line}></SectionFill> :
                          state.action === "loadinganimation" ? <SectionAnimation></SectionAnimation> :
                            <SectionExport></SectionExport>
          }
        </div>
      </div>
    </Card><br></br><br></br><br></br>
    <label><a href="https://github.com/dinoosauro/chart-animate" target="_blank">This website</a> has been made possible thanks to the <a target="_blank" href="https://github.com/chartjs/Chart.js/?tab=MIT-1-ov-file">chart.js library</a> and the <a href="https://github.com/Stuk/jszip?tab=License-1-ov-file" target="_blank">JSZip library</a>, in addition with the <a href="https://github.com/facebook/react?tab=MIT-1-ov-file#readme" target="_blank">React framework</a></label><br></br><br></br>
  </>
}