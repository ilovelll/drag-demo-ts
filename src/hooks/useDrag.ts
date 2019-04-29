import { useState, useCallback, useEffect, useRef } from "react";

interface DragProps {
  key :string;
  ref: React.RefObject<HTMLElement>;
  onDragStart: () => void;
  onDragOver?: () => void;
  onDragEnd: () => void;
}

const useDrag = ({ key, ref, onDragStart, onDragOver, onDragEnd }: DragProps) => {
  const [dragState, updateDragState] = useState("draggable");
  const dragStartCb = (ev: DragEvent) => {
    updateDragState("dragStart");
    // ev.dataTransfer.dropEffect = effect;
    const sourceData = {
      key,
      clientX: ev.clientX,
      clientY: ev.clientY,
      layerX: ev.layerX,
      layerY: ev.layerY,
      offsetX: ev.offsetX,
      offsetY: ev.offsetY,
      pageX: ev.pageX,
      pageY: ev.pageY,
      screenX: ev.screenX,
      screenY: ev.screenY,
      x: ev.x,
      y: ev.y
    }
    ev.dataTransfer&&ev.dataTransfer.setData("source", JSON.stringify(sourceData));
    onDragStart && onDragStart();
  };
  const dragOverCb = (ev: DragEvent) => {
    ev.preventDefault();
    updateDragState("dragging");
    onDragOver && onDragOver();
  };

  const dragEndCb = (ev: DragEvent) => {
    updateDragState("draggable");
    // if (effect === "move") {
    //   updateDragState("moved");
    // }
    onDragEnd && onDragEnd();
  };
  useEffect(() => {
    const elem = ref.current;
    if (elem) {
      elem.setAttribute("draggable", "true");
      elem.addEventListener("dragstart", dragStartCb);
      elem.addEventListener("dragover", dragOverCb);
      elem.addEventListener("dragend", dragEndCb);
      return () => {
        elem.removeEventListener("dragstart", dragStartCb);
        elem.removeEventListener("dragover", dragOverCb);
        elem.removeEventListener("dragend", dragEndCb);
      };
    }
  }, []);
  return {
    dragState: dragState
  };
};

export default useDrag;
