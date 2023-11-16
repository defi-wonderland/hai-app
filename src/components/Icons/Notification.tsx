import type { IconProps } from '~/types'

export function Notification({ size = 20, ...props }: IconProps) {
    return (
        <svg
            width={20 * size / 23}
            height={size}
            viewBox="0 0 20 23"
            fill="black"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path d="M18.9705 15.575C18.8909 15.4792 18.8129 15.3834 18.7362 15.291C17.6825 14.0164 17.045 13.2472 17.045 9.63904C17.045 7.77103 16.5981 6.2383 15.7172 5.08876C15.0677 4.23953 14.1898 3.59531 13.0326 3.11921C13.0177 3.11092 13.0044 3.10006 12.9933 3.08711C12.5771 1.69329 11.4381 0.759766 10.1534 0.759766C8.86883 0.759766 7.7303 1.69329 7.31407 3.08568C7.30297 3.09814 7.28985 3.10867 7.27528 3.11681C4.57481 4.22852 3.26241 6.3614 3.26241 9.6376C3.26241 13.2472 2.62585 14.0164 1.57114 15.2895C1.49451 15.382 1.41643 15.4758 1.33692 15.5736C1.13154 15.8213 1.00141 16.1226 0.961939 16.4419C0.922468 16.7613 0.975305 17.0852 1.1142 17.3755C1.40973 17.9981 2.03958 18.3847 2.75853 18.3847H17.5536C18.2692 18.3847 18.8948 17.9986 19.1913 17.3788C19.3308 17.0885 19.3841 16.7643 19.345 16.4446C19.3058 16.1249 19.1759 15.8231 18.9705 15.575Z"/>
            <path d="M10.1535 22.218C10.8456 22.2175 11.5247 22.0296 12.1187 21.6743C12.7127 21.3191 13.1995 20.8096 13.5274 20.2001C13.5428 20.1709 13.5505 20.1382 13.5495 20.1052C13.5486 20.0721 13.5391 20.0399 13.5221 20.0116C13.505 19.9833 13.4809 19.9599 13.4521 19.9437C13.4234 19.9274 13.3909 19.9189 13.3578 19.9189H6.95008C6.91699 19.9188 6.88444 19.9273 6.85559 19.9435C6.82674 19.9597 6.80258 19.9831 6.78546 20.0114C6.76834 20.0397 6.75884 20.072 6.75789 20.105C6.75694 20.1381 6.76457 20.1709 6.78004 20.2001C7.10792 20.8096 7.59461 21.3189 8.18852 21.6742C8.78243 22.0295 9.46142 22.2174 10.1535 22.218Z"/>
        </svg>
    )
}
