const leftSparkSeeds = [
  { x: 8, rise: 115, drift: 12, duration: 4.2, delay: -1.4, size: 1.2, shape: 'dot' },
  { x: 22, rise: 175, drift: -8, duration: 5.1, delay: -3.2, size: 1.5, shape: 'fragment' },
  { x: 35, rise: 95, drift: 10, duration: 3.8, delay: -0.8, size: 1, shape: 'streak' },
  { x: 48, rise: 230, drift: -12, duration: 6.2, delay: -4.8, size: 1.4, shape: 'dot' },
  { x: 70, rise: 140, drift: 7, duration: 4.7, delay: -2.5, size: 1.1, shape: 'fragment' },
];

const rightSparkSeeds = [
  { x: 18, rise: 120, drift: -9, duration: 4.4, delay: -2.1, size: 1.2, shape: 'dot' },
  { x: 34, rise: 205, drift: 11, duration: 5.8, delay: -4.2, size: 1.5, shape: 'fragment' },
  { x: 52, rise: 105, drift: -7, duration: 3.9, delay: -1.1, size: 1, shape: 'streak' },
  { x: 70, rise: 250, drift: 13, duration: 6.5, delay: -5.1, size: 1.3, shape: 'dot' },
  { x: 88, rise: 155, drift: -10, duration: 4.9, delay: -2.8, size: 1.2, shape: 'fragment' },
];

function SparkZone({ side, seeds }) {
  return (
    <div
      className={`hero-spark-zone hero-spark-zone-${side}`}
      aria-hidden="true"
    >
      {seeds.map((spark, index) => (
        <span
          className={`hero-spark hero-spark-${spark.shape}`}
          key={`${side}-spark-${index}`}
          style={{
            '--spark-x': `${spark.x}%`,
            '--spark-rise': `${spark.rise}px`,
            '--spark-drift': `${side === 'left' ? spark.drift : -spark.drift}px`,
            '--spark-duration': `${spark.duration}s`,
            '--spark-delay': `${spark.delay}s`,
            '--spark-size': `${spark.size}px`,
          }}
        />
      ))}
    </div>
  );
}

export function SparkLayer() {
  return (
    <div className="hero-spark-layer" aria-hidden="true">
      <SparkZone side="left" seeds={leftSparkSeeds} />
      <SparkZone side="right" seeds={rightSparkSeeds} />
    </div>
  );
}

