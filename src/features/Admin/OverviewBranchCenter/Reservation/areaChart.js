import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Line, G2 } from "@ant-design/plots";

import { each, findIndex } from "@antv/util";
import { handleGetChartBooking } from "../CenterAPI";
import moment from "moment";
const countCreatedAtElInArr = (arr = [], el1) => {
  let count = 0;
  arr.forEach((el) => {
    // console.log("el.createdAt === el", el);
    if (moment(el.createdAt).format("YYYY-MM-DD") === el1) count++;
  });
  return count;
};
const AreaChart = () => {
  const CenterId = localStorage.getItem("CenterId");
  const [allDataChart, setDataChart] = useState([]);
  useEffect(() => {
    handleGetChartBooking(CenterId ? CenterId : -1, 1).then((res) => {
      const newArr = [];
      const countCreatedAtArr = res.bookingOfCenter.count;
      countCreatedAtArr.forEach((el) => {
        // console.log(el.createdAt);
        if (
          countCreatedAtElInArr(
            countCreatedAtArr,
            moment(el.createdAt).format("YYYY-MM-DD")
          ) > 0
        ) {
          // console.log(newArr.some((el1) => el1.createdAt === el.createdAt));
          if (
            !newArr.some(
              (el1) =>
                moment(el1.createdAt).format("YYYY-MM-DD") ===
                moment(el.createdAt).format("YYYY-MM-DD")
            )
          ) {
            const newCount = countCreatedAtElInArr(
              countCreatedAtArr,
              moment(el.createdAt).format("YYYY-MM-DD")
            );
            const newObj = {
              id: el.id,
              createdAt: moment(el.createdAt).format("dddd"),
              count: newCount,
            };
            newArr.push(newObj);
          }
        } else {
          newArr.push(el);
        }
      });
      //dsad
      // console.log(newArr);
      setData(newArr);
      // setDataChart(moment(newArr.createdAt).format("dddd"));
      setDataChart(newArr);
    });
  }, [CenterId]);
  // console.log("check all data: ", allDataChart);
  const { InteractionAction, registerInteraction, registerAction } = G2;
  const [data, setData] = useState([
    {
      id: 1,
      createdAt: "Mon",
      count: 3,
    },
    {
      id: 2,
      createdAt: "Tue",
      count: 4,
    },
    {
      id: 3,
      createdAt: "Wed",
      count: 3.5,
    },
    {
      id: 4,
      createdAt: "Thurs",
      count: 5,
    },
    {
      id: 5,
      createdAt: "Fri",
      count: 4.9,
    },
    {
      id: 6,
      year: "Sat",
      value: 6,
    },
    {
      id: 7,
      year: "Sun",
      value: 7,
    },
  ]);
  G2.registerShape("point", "custom-point", {
    draw(cfg, container) {
      const point = {
        x: cfg.x,
        y: cfg.y,
      };
      const group = container.addGroup();
      group.addShape("circle", {
        name: "outer-point",
        attrs: {
          x: point.x,
          y: point.y,
          fill: cfg.color || "red",
          opacity: 0.5,
          r: 6,
        },
      });
      group.addShape("circle", {
        name: "inner-point",
        attrs: {
          x: point.x,
          y: point.y,
          fill: cfg.color || "red",
          opacity: 1,
          r: 2,
        },
      });
      return group;
    },
  });

  class CustomMarkerAction extends InteractionAction {
    active() {
      const view = this.getView();
      const evt = this.context.event;

      if (evt.data) {
        const { items } = evt.data;
        const pointGeometries = view.geometries.filter(
          (geom) => geom.type === "point"
        );
        each(pointGeometries, (pointGeometry) => {
          each(pointGeometry.elements, (pointElement, idx) => {
            const active =
              findIndex(items, (item) => item.data === pointElement.data) !==
              -1;
            const [point0, point1] = pointElement.shape.getChildren();

            if (active) {
              // outer-circle
              point0.animate(
                {
                  r: 10,
                  opacity: 0.2,
                },
                {
                  duration: 1800,
                  easing: "easeLinear",
                  repeat: true,
                }
              ); // inner-circle

              point1.animate(
                {
                  r: 6,
                  opacity: 0.4,
                },
                {
                  duration: 800,
                  easing: "easeLinear",
                  repeat: true,
                }
              );
            } else {
              this.resetElementState(pointElement);
            }
          });
        });
      }
    }

    reset() {
      const view = this.getView();
      const points = view.geometries.filter((geom) => geom.type === "point");
      each(points, (point) => {
        each(point.elements, (pointElement) => {
          this.resetElementState(pointElement);
        });
      });
    }

    resetElementState(element) {
      const [point0, point1] = element.shape.getChildren();
      point0.stopAnimate();
      point1.stopAnimate();
      const { r, opacity } = point0.get("attrs");
      point0.attr({
        r,
        opacity,
      });
      const { r: r1, opacity: opacity1 } = point1.get("attrs");
      point1.attr({
        r: r1,
        opacity: opacity1,
      });
    }

    getView() {
      return this.context.view;
    }
  }

  registerAction("custom-marker-action", CustomMarkerAction);
  registerInteraction("custom-marker-interaction", {
    start: [
      {
        trigger: "tooltip:show",
        action: "custom-marker-action:active",
      },
    ],
    end: [
      {
        trigger: "tooltip:hide",
        action: "custom-marker-action:reset",
      },
    ],
  });
  const config = {
    data,
    xField: "createdAt",
    yField: "count",
    label: {},
    point: {
      size: 5,
      shape: "custom-point",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [
      {
        type: "custom-marker-interaction",
      },
    ],
  };
  // console.log("check data: ", data);
  return <Line {...config} />;
};
export default AreaChart;
