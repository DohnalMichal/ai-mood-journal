type Props = {
  value: number
  min?: number
  max?: number
  size?: number
}

const Gauge = ({ value, min = -10, max = 10, size = 250 }: Props) => {
  // Clamp value within range
  const clampedValue = Math.max(min, Math.min(max, value))

  // Map value to angle (-90° to 90°)
  const angle = ((clampedValue - min) / (max - min)) * 180 - 90

  // Calculate the radius and center
  const radius = size / 2
  const strokeWidth = 20
  const center = size / 2

  // Define the semi-circle path
  const semiCirclePath = `
    M ${center - radius}, ${center}
    A ${radius},${radius} 0 0,1 ${center + radius},${center}
  `

  const textHeight = 13
  const padding = strokeWidth / 2 + textHeight
  const viewBox = `-${padding} -${padding} ${size + padding * 2} ${size / 2 + padding * 2}`

  return (
    <svg width={size} viewBox={viewBox} height={size / 2}>
      {/* Gauge Background */}
      <defs>
        <linearGradient
          id="gaugeGradient"
          gradientUnits="userSpaceOnUse"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="red" />
          <stop offset="20%" stopColor="darkblue" />
          <stop offset="40%" stopColor="lightblue" />
          <stop offset="50%" stopColor="white" />
          <stop offset="70%" stopColor="yellowgreen" />
          <stop offset="100%" stopColor="yellow" />
        </linearGradient>
      </defs>
      <path
        d={semiCirclePath}
        fill="none"
        stroke="url(#gaugeGradient)" // Apply gradient
        strokeWidth={strokeWidth}
      />
      {/* Pointer */}
      <line
        className="stroke-muted-foreground"
        x1={center}
        y1={center}
        x2={center + radius * Math.cos((angle * Math.PI) / 180)}
        y2={center - radius * Math.sin((angle * Math.PI) / 180)}
        strokeWidth={strokeWidth / 2}
        strokeLinecap="round"
      />
      {/* Labels */}
      <text x={center - radius} y={center + 20} textAnchor="middle">
        {min}
      </text>
      <text x={center + radius} y={center + 20} textAnchor="middle">
        {max}
      </text>
    </svg>
  )
}

export { Gauge }
