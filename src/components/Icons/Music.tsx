import type { IconProps } from '~/types'

export function Music({ size = 20, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="black"
            strokeLinejoin="round"
            {...props}>
            <path d="m 5.9321068,4.960636 c 0,0 0.015572,-1.6120133 1.7074373,-1.862659 1.1311205,-0.1675735 8.5371869,-1.086551 8.5371869,-1.086551 0,0 1.552216,-0.2322077 1.552216,1.3969942 V 13.653045 c 0,0 -0.720426,3.104432 -3.414875,3.104432 -2.69445,0 -2.926611,-3.206044 -0.931329,-4.346204 1.315894,-0.75194 2.793988,-0.776108 2.793988,-0.776108 V 6.6680734 L 7.6395441,7.7546243 v 7.1401937 c 0,0 -0.6577633,3.041768 -3.4148748,3.104431 C 1.7152109,18.05628 1.2221712,14.848835 3.2933399,13.653045 4.4920652,12.96096 5.932,12.877 5.932,12.877 Z"/>
        </svg>

    )
}
