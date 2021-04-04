import React, {Fragment, useEffect, useRef, useState} from 'react';
import {Arrow, Circle, Line, Rect, Text, Transformer} from "react-konva";

const Shape = ({i,shape,selectItem,dragItem,onChangeItem}) => {

    const shapeRef = useRef(null);
    const trRef = useRef(null);
    useEffect(()=>{
        if(shape.selected && trRef){
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    },[shape.selected,trRef])

    const transformItem = () => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end

        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChangeItem(i,node,scaleX,scaleY)
    }


    return(
        <Fragment>
            {shape.type === "rect" &&
            <Rect
                ref={shapeRef}
                x={shape.x}
                y={shape.y}
                key={i}
                width={shape.width}
                height={shape.height}
                fill={shape.background}
                stroke={shape.borderColor}
                strokeWidth={shape.borderWidth}
                cornerRadius={shape.borderRadius}
                onClick={()=>selectItem(i)}
                onTap={()=>selectItem(i)}
                draggable
                onDragEnd={(e) => dragItem(e,i)}
                onTransformEnd={() => transformItem()}
            />
            }
            {shape.type === "circle" &&
            <Circle
                ref={shapeRef}
                key={i}
                x={shape.x}
                y={shape.y}
                radius={shape.radius}
                fill={shape.background}
                stroke={shape.borderColor}
                strokeWidth={shape.borderWidth}
                onClick={()=>selectItem(i)}
                onTap={()=>selectItem(i)}
                draggable
                onDragEnd={(e) => dragItem(e,i)}
                onTransformEnd={() => transformItem()}
            />
            }
            {shape.type === "line" &&
            <Line
                ref={shapeRef}
                key={i}
                x={shape.x}
                y={shape.y}
                points={[0,0,100,0]}
                stroke={shape.color}
                strokeWidth={shape.height}
                onClick={()=>selectItem(i)}
                onTap={()=>selectItem(i)}
                draggable
                onDragEnd={(e) => dragItem(e,i)}
                onTransformEnd={() => transformItem()}
            />
            }
            {shape.type === "doubleArrow" && <Arrow
                ref={shapeRef}
                key={i}
                x={shape.x}
                y={shape.y}
                points={[0,0,100,0]}
                stroke={shape.color}
                strokeWidth={shape.height}
                pointerAtBeginning={false}
                onClick={()=>selectItem(i)}
                onTap={()=>selectItem(i)}
                draggable
                onDragEnd={(e) => dragItem(e,i)}
                onTransformEnd={() => transformItem()}
            />}
            {shape.type === "singleArrow" && <Arrow
                ref={shapeRef}
                key={i}
                x={shape.x}
                y={shape.y}
                points={[0,0,100,0]}
                stroke={shape.color}
                strokeWidth={shape.height}
                pointerAtBeginning={true}
                onClick={()=>selectItem(i)}
                onTap={()=>selectItem(i)}
                draggable
                onDragEnd={(e) => dragItem(e,i)}
                onTransformEnd={() => transformItem()}
            />}
            {shape.type === "text" &&
            <Text
                ref={shapeRef}
                key={i}
                align="center"
                verticalAlign="middle"
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fontSize={shape.fontSize}
                stroke={shape.color}
                text={shape.text}
                onClick={()=>selectItem(i)}
                onTap={()=>selectItem(i)}
                draggable
                onDragEnd={(e) => dragItem(e,i)}
                onTransformEnd={() => transformItem()}
            />}
            {shape.selected &&
            <Transformer
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                    }
                    return newBox;
                }}
            />
            }
        </Fragment>
    )
};

export default Shape;
