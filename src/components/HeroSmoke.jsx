import './HeroSmoke.css';

const smokeMasses = [
  { zone: 'hair-left', x: '20%', y: '17%', size: 'clamp(170px, 22vw, 330px)', opacity: 0.52, blur: '14px', drift: '-18px', rise: '-86px', duration: '13s', delay: '-5s' },
  { zone: 'hair-high', x: '30%', y: '8%', size: 'clamp(130px, 17vw, 250px)', opacity: 0.34, blur: '18px', drift: '22px', rise: '-122px', duration: '17s', delay: '-11s' },
  { zone: 'shoulder-left', x: '13%', y: '58%', size: 'clamp(190px, 25vw, 360px)', opacity: 0.48, blur: '16px', drift: '-26px', rise: '-118px', duration: '15s', delay: '-8s' },
  { zone: 'hoodie-left', x: '27%', y: '78%', size: 'clamp(180px, 24vw, 340px)', opacity: 0.42, blur: '13px', drift: '28px', rise: '-94px', duration: '12s', delay: '-3s' },
  { zone: 'shoulder-right', x: '47%', y: '56%', size: 'clamp(140px, 18vw, 270px)', opacity: 0.25, blur: '19px', drift: '18px', rise: '-102px', duration: '16s', delay: '-12s' },
  { zone: 'hoodie-right', x: '49%', y: '79%', size: 'clamp(150px, 20vw, 290px)', opacity: 0.28, blur: '15px', drift: '-20px', rise: '-78px', duration: '14s', delay: '-7s' },
  { zone: 'edge-left', x: '4%', y: '39%', size: 'clamp(120px, 16vw, 220px)', opacity: 0.2, blur: '20px', drift: '30px', rise: '-130px', duration: '19s', delay: '-15s' },
  { zone: 'edge-right', x: '70%', y: '70%', size: 'clamp(100px, 14vw, 200px)', opacity: 0.15, blur: '22px', drift: '-24px', rise: '-112px', duration: '18s', delay: '-9s' },
];

export default function HeroSmoke() {
  return (
    <div className="hero-smoke-layer" aria-hidden="true">
      <svg className="hero-smoke-filter-defs" aria-hidden="true" focusable="false">
        <defs>
          <filter id="hero-smoke-turbulence" x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.035" numOctaves="2" seed="17" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="34" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {smokeMasses.map((mass, index) => (
        <span
          className={`hero-smoke-mass hero-smoke-${mass.zone}`}
          key={`smoke-${index}`}
          style={{
            '--smoke-x': mass.x,
            '--smoke-y': mass.y,
            '--smoke-size': mass.size,
            '--smoke-opacity': mass.opacity,
            '--smoke-blur': mass.blur,
            '--smoke-drift': mass.drift,
            '--smoke-rise': mass.rise,
            '--smoke-duration': mass.duration,
            '--smoke-delay': mass.delay,
          }}
        />
      ))}
    </div>
  );
}
