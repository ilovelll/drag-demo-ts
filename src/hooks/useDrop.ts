import React, { useState, useEffect } from "react";

interface DropProps {
  ref: React.RefObject<HTMLElement>;
  onDrop: (source: {key: string, X:number,Y:number}) => void
}
const useDrop = ({ ref, onDrop }: DropProps) => {
  const [dropState, updateDropState] = useState("droppable");
  const dropOverCb = (ev: DragEvent) => {
    ev.preventDefault();
    updateDropState("dragging over");
  };

  const dropCb = (ev: DragEvent) => {
    ev.preventDefault();
    if (!ev.dataTransfer) return;
    const previousData = JSON.parse(ev.dataTransfer.getData("source"));
    const toffset = {
      x: {
        previous: previousData.x,
        now: ev.x,
        offset: ev.x - previousData.x
      },
      y: {
        previous: previousData.y,
        now: ev.y,
        offset: ev.y - previousData.y
      },
      screenX: {
        previous: previousData.screenX,
        now: ev.screenX,
        offset: ev.screenX - previousData.screenX
      },
      screenY: {
        previous: previousData.screenY,
        now: ev.screenY,
        offset: ev.screenY - previousData.screenY
      },
      layerX: {
        previous: previousData.layerX,
        now: ev.layerX,
        offset: ev.layerX - previousData.layerX
      },
      layerY: {
        previous: previousData.layerY,
        now: ev.layerY,
        offset: ev.layerY - previousData.layerY
      },
      pageX: {
        previous: previousData.pageX,
        now: ev.pageX,
        offset: ev.pageX - previousData.pageX
      },
      pageY: {
        previous: previousData.pageY,
        now: ev.pageY,
        offset: ev.pageY - previousData.pageY
      },
      clientX: {
        previous: previousData.clientX,
        now: ev.clientX,
        offset: ev.clientX - previousData.clientX
      }, clientY: {
        previous: previousData.clientY,
        now: ev.clientX,
        offset: ev.clientY - previousData.clientY
      }
    }
    console.table(toffset);
    const dropParams = {
      key: previousData.key,
      X: ev.x - previousData.x,
      Y: ev.y - previousData.y,
    }
    onDrop(dropParams);
    updateDropState("dropped");
  };
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.addEventListener("dragover", dropOverCb);
      elem.addEventListener("drop", dropCb);
      return () => {
        elem.removeEventListener("dragover", dropOverCb);
        elem.removeEventListener("drop", dropCb);
      };
    }
  });
  return {
    dropState
  };
};

export default useDrop;
