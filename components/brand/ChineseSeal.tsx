import { cn } from '@/lib/utils';

/**
 * ChineseSeal — 仿汉印方框印章 SVG 装饰元素。
 *
 * 视觉锚：每页 1-2 处，作为页面文化印记，不喧宾夺主。
 *
 * - 红色方框（vermilion #C8102E）+ 内部居中 1-2 字楷体
 * - variant="solid"：红底 + 浅米字（默认；hero 等暖底/暗底场景）
 * - variant="outline"：红框 + 红字（白底/暖底场景）
 * - 默认 -2deg 旋转制造手盖感，可通过外层 className 覆盖
 * - aria 默认 hidden（纯装饰），传 ariaLabel 时退化为 role="img"
 */
export type ChineseSealProps = {
  text?: string;
  className?: string;
  size?: number;
  ariaLabel?: string;
  variant?: 'solid' | 'outline';
};

const SEAL_RED = '#C8102E';
const SEAL_INK_LIGHT = '#FAF7EE';
const SEAL_FONT =
  "'KaiTi','STKaiti','楷体','STSong','SimSun','Songti SC',serif";

export function ChineseSeal({
  text = '熊猫',
  className,
  size = 48,
  ariaLabel,
  variant = 'solid',
}: ChineseSealProps) {
  const chars = text.slice(0, 4).split('');
  const cols = chars.length <= 1 ? 1 : 2;
  const rows = chars.length <= 1 ? 1 : Math.ceil(chars.length / cols);

  const isOutline = variant === 'outline';
  const fillBg = isOutline ? 'none' : SEAL_RED;
  const stroke = SEAL_RED;
  const charFill = isOutline ? SEAL_RED : SEAL_INK_LIGHT;

  // SVG viewBox 64×64 — keep size prop the rendered px while preserving aspect.
  const cellSize = 56 / Math.max(cols, rows);
  const fontSize = cellSize * 0.78;

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      className={cn('inline-block select-none', className)}
    >
      <rect
        x="3.5"
        y="3.5"
        width="57"
        height="57"
        fill={fillBg}
        stroke={stroke}
        strokeWidth={isOutline ? 2 : 3}
        rx="2.5"
      />
      <g
        fontFamily={SEAL_FONT}
        fontWeight="700"
        fontSize={fontSize}
        fill={charFill}
        textAnchor="middle"
        dominantBaseline="central"
      >
        {chars.map((c, i) => {
          const col = chars.length <= 1 ? 0 : i % cols;
          const row = chars.length <= 1 ? 0 : Math.floor(i / cols);
          const cx = 32 + (col - (cols - 1) / 2) * cellSize;
          const cy = 32 + (row - (rows - 1) / 2) * cellSize;
          return (
            <text key={i} x={cx} y={cy}>
              {c}
            </text>
          );
        })}
      </g>
    </svg>
  );
}

export default ChineseSeal;
