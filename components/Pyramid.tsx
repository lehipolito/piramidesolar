import React from 'react';
import type { PyramidLevelData } from '../types';

interface PyramidProps {
  levels: PyramidLevelData[];
  selectedLevel: PyramidLevelData | null;
  hoveredLevel: PyramidLevelData | null;
  onSelectLevel: (level: PyramidLevelData) => void;
  onHoverLevel: (level: PyramidLevelData | null) => void;
}

export const Pyramid: React.FC<PyramidProps> = ({ levels, selectedLevel, hoveredLevel, onSelectLevel, onHoverLevel }) => {
  const pyramidWidth = 400; // Base width of the coordinate system
  const pyramidHeight = 600; // Base height of the coordinate system
  const topWidth = 80; // Defines the width of the flat top
  const numLevels = levels.length;
  const levelHeight = pyramidHeight / numLevels;
  const bracketAreaWidth = 150; // Extra space for brackets and labels

  const tierGroups = [
      {
        labelLines: ['Tier 1', 'Premium'],
        startLevel: 0,
        endLevel: 3,
        color: '#15803d' // green-700
      },
      {
        labelLines: ['Tier 2'],
        startLevel: 3,
        endLevel: 6,
        color: '#f59e0b' // amber-500
      },
      {
        labelLines: ['Especulativo'],
        startLevel: 6,
        endLevel: levels.length,
        color: '#dc2626' // red-600
      }
    ];

  // By removing the max-width constraint, the SVG can now flexibly fill its parent container,
  // making it truly responsive across all screen sizes. The parent container in App.tsx
  // controls its size (e.g., w-full lg:w-1/2).
  return (
    <div className="w-full px-4 sm:px-0 h-full">
      <svg
        // The viewBox defines the aspect ratio and coordinate system.
        // `w-full` and `h-full` make it scale to fit the container while maintaining the ratio.
        viewBox={`0 0 ${pyramidWidth + bracketAreaWidth} ${pyramidHeight}`}
        className="w-full h-full drop-shadow-lg"
        style={{ overflow: 'visible' }}
        onMouseLeave={() => onHoverLevel(null)}
      >
        <g>
          {levels.map((level, i) => {
            const yTop = i * levelHeight;
            const yBottom = (i + 1) * levelHeight;

            // Using linear interpolation for a truncated pyramid (frustum)
            const widthTop = topWidth + (yTop / pyramidHeight) * (pyramidWidth - topWidth);
            const widthBottom = topWidth + (yBottom / pyramidHeight) * (pyramidWidth - topWidth);
            
            const xTopLeft = (pyramidWidth - widthTop) / 2;
            const xTopRight = (pyramidWidth + widthTop) / 2;
            const xBottomLeft = (pyramidWidth - widthBottom) / 2;
            const xBottomRight = (pyramidWidth + widthBottom) / 2;
            
            const isSelected = selectedLevel?.id === level.id;
            const isHovered = hoveredLevel?.id === level.id;
            
            const getOpacity = () => {
              if (isSelected || isHovered) return 1;
              if (selectedLevel) return 0.5;
              return 1;
            }

            const getFilter = () => {
              if (isSelected) return `drop-shadow(0 0 10px ${level.colorHex})`;
              if (isHovered) return `drop-shadow(0 0 12px ${level.colorHex}A0)`;
              return 'none';
            };

            const getStrokeColor = () => {
              if (isSelected) return '#1f2937'; // gray-800
              if (isHovered) return '#d1d5db'; // gray-300
              return 'white';
            };

            // Generate path data for a trapezoid with rounded corners
            const r = 20; // Corner radius
            
            const p1 = { x: xTopRight, y: yTop };      // Top-right
            const p2 = { x: xBottomRight, y: yBottom };  // Bottom-right
            const p3 = { x: xBottomLeft, y: yBottom };   // Bottom-left
            const p4 = { x: xTopLeft, y: yTop };       // Top-left

            const rightSideLength = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
            const leftSideLength = Math.sqrt(Math.pow(p4.x - p3.x, 2) + Math.pow(p4.y - p3.y, 2));

            const u_rd = { x: (p2.x - p1.x) / rightSideLength, y: (p2.y - p1.y) / rightSideLength }; // Unit vector: right-down
            const u_lu = { x: (p4.x - p3.x) / leftSideLength, y: (p4.y - p3.y) / leftSideLength };  // Unit vector: left-up

            const pathData = [
              `M ${p4.x + r},${p4.y}`, // Start on top edge, after top-left corner
              `L ${p1.x - r},${p1.y}`, // Line to before top-right corner
              `Q ${p1.x},${p1.y} ${p1.x + r * u_rd.x},${p1.y + r * u_rd.y}`, // Top-right corner
              `L ${p2.x - r * u_rd.x},${p2.y - r * u_rd.y}`, // Line down right side
              `Q ${p2.x},${p2.y} ${p2.x - r},${p2.y}`, // Bottom-right corner
              `L ${p3.x + r},${p3.y}`, // Line across bottom
              `Q ${p3.x},${p3.y} ${p3.x + r * u_lu.x},${p3.y + r * u_lu.y}`, // Bottom-left corner
              `L ${p4.x - r * u_lu.x},${p4.y - r * u_lu.y}`, // Line up left side
              `Q ${p4.x},${p4.y} ${p4.x + r},${p4.y}`, // Top-left corner
              'Z'
            ].join(' ');

            return (
              <g
                key={level.id}
                onClick={() => onSelectLevel(level)}
                onMouseEnter={() => onHoverLevel(level)}
                className="cursor-pointer group transition-transform"
                style={{
                  transformOrigin: 'center center',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                  transitionDuration: '400ms',
                  transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', // Creates a "bounce" effect
                }}
              >
                <path
                  d={pathData}
                  fill={level.colorHex}
                  stroke={getStrokeColor()}
                  strokeWidth={isSelected ? 2.5 : 2}
                  className="transition-all duration-300"
                  style={{
                    opacity: getOpacity(),
                    filter: getFilter(),
                  }}
                />
                <path
                  d={pathData}
                  fill="transparent"
                  className="group-hover:fill-black/5 transition-colors duration-200"
                />
                <text
                  x={pyramidWidth / 2}
                  y={yTop + levelHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#1f2937"
                  fontSize="26"
                  fontWeight="bold"
                  // Adding a stroke makes the text much clearer against varying background colors.
                  stroke="white"
                  strokeWidth="0.75"
                  paintOrder="stroke"
                  className="pointer-events-none select-none"
                >
                  {level.label}
                </text>
              </g>
            );
          })}
        </g>
        <g>
            {tierGroups.map((group) => {
                const yTop = group.startLevel * levelHeight;
                const yBottom = group.endLevel * levelHeight;
                const bracketX = pyramidWidth + 20;
                const tickLength = 10;

                const pathData = [
                    `M ${bracketX - tickLength},${yTop}`, // Top tick start
                    `L ${bracketX},${yTop}`,               // Top tick end, vertical line start
                    `L ${bracketX},${yBottom}`,            // Vertical line end
                    `L ${bracketX - tickLength},${yBottom}`// Bottom tick end
                ].join(' ');

                const lines = group.labelLines;

                return (
                    <g key={group.labelLines.join('-')}>
                        <path
                            d={pathData}
                            fill="none"
                            stroke={group.color}
                            strokeWidth="2.5"
                            strokeLinecap="round"
                        />
                         <text
                            dominantBaseline="middle"
                            textAnchor="start"
                            fontSize="20"
                            fontWeight="600"
                            fill={group.color}
                        >
                             {lines.map((line, i) => (
                                <tspan key={i} x={bracketX + 12} dy={i === 0 ? (yTop + yBottom) / 2 - (lines.length -1) * 10 : '1.2em'}>{line}</tspan>
                             ))}
                        </text>
                    </g>
                )
            })}
        </g>
      </svg>
    </div>
  );
};
