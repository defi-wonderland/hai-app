import type { IconProps } from '~/types'

export function Gear({ size = 23, ...props }: IconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 23 23"
            fill="black"
            stroke="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path d="M11.4708 7.69034C10.6945 7.69034 9.9355 7.92056 9.28996 8.3519C8.64442 8.78323 8.14128 9.39631 7.84417 10.1136C7.54706 10.8309 7.46933 11.6202 7.62079 12.3816C7.77226 13.1431 8.14612 13.8425 8.69511 14.3915C9.2441 14.9405 9.94355 15.3144 10.705 15.4659C11.4665 15.6173 12.2558 15.5396 12.9731 15.2425C13.6903 14.9454 14.3034 14.4422 14.7347 13.7967C15.1661 13.1511 15.3963 12.3922 15.3963 11.6158C15.3932 10.5757 14.9786 9.57901 14.2431 8.84351C13.5076 8.10802 12.511 7.69344 11.4708 7.69034ZM19.9459 11.6158C19.9439 11.9826 19.917 12.3488 19.8655 12.712L22.2546 14.5825C22.3587 14.6684 22.4288 14.7885 22.4524 14.9214C22.476 15.0542 22.4517 15.1912 22.3836 15.3077L20.1236 19.2096C20.0549 19.3251 19.9476 19.4127 19.8207 19.457C19.6938 19.5012 19.5554 19.4993 19.4297 19.4515L16.6206 18.323C16.0356 18.7734 15.3955 19.1472 14.7157 19.4353L14.2957 22.4177C14.2722 22.5513 14.203 22.6726 14.1 22.7608C13.997 22.8491 13.8665 22.8988 13.7309 22.9015H9.21075C9.0776 22.8989 8.94926 22.8513 8.84669 22.7664C8.74411 22.6814 8.67336 22.5642 8.64597 22.4339L8.22594 19.4515C7.54432 19.1668 6.90373 18.7923 6.32111 18.3382L3.51194 19.4668C3.38637 19.5145 3.24797 19.5165 3.12107 19.4724C2.99417 19.4282 2.8869 19.3408 2.81812 19.2253L0.558026 15.3239C0.489996 15.2074 0.465624 15.0704 0.489265 14.9376C0.512906 14.8047 0.58302 14.6846 0.687076 14.5987L3.07622 12.7282C3.02526 12.3595 2.99838 11.988 2.99574 11.6158C2.99779 11.249 3.02467 10.8828 3.07622 10.5196L0.687076 8.64913C0.58302 8.56321 0.512906 8.44309 0.489265 8.31024C0.465624 8.17738 0.489996 8.04044 0.558026 7.9239L2.81812 4.02198C2.88682 3.90647 2.99406 3.81889 3.12097 3.77465C3.24787 3.7304 3.38632 3.73232 3.51194 3.78008L6.32111 4.90865C6.90606 4.45821 7.5462 4.08438 8.22594 3.79627L8.64597 0.813892C8.66948 0.680303 8.73865 0.559024 8.84166 0.470779C8.94467 0.382534 9.07513 0.332801 9.21075 0.330078H13.7309C13.8641 0.33267 13.9924 0.38032 14.095 0.46525C14.1976 0.55018 14.2683 0.667374 14.2957 0.7977L14.7157 3.78008C15.3982 4.06466 16.0396 4.43909 16.623 4.89344L19.4297 3.76487C19.5553 3.71707 19.6937 3.71507 19.8206 3.75923C19.9475 3.80338 20.0548 3.89086 20.1236 4.00628L22.3836 7.9082C22.4517 8.02474 22.476 8.16168 22.4524 8.29453C22.4288 8.42739 22.3587 8.54751 22.2546 8.63343L19.8655 10.5039C19.9164 10.8724 19.9433 11.2438 19.9459 11.6158Z"/>
        </svg>
    )
}
