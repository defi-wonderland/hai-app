import React, { type SVGProps } from 'react'

const Info = (props: Omit<SVGProps<SVGElement>, 'ref'>) => {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M5.94059 10.0902C3.17523 10.0902 0.933594 7.84854 0.933594 5.08317C0.933594 2.31781 3.17523 0.0761719 5.94059 0.0761719C8.70596 0.0761719 10.9476 2.31781 10.9476 5.08317C10.9476 7.84854 8.70596 10.0902 5.94059 10.0902ZM5.43989 6.58527V7.58667H6.44129V6.58527H5.43989ZM6.44129 5.76162C6.84369 5.64034 7.18914 5.37856 7.41473 5.02396C7.64032 4.66936 7.73104 4.24553 7.67038 3.82965C7.60971 3.41378 7.40169 3.03352 7.0842 2.75815C6.76671 2.48277 6.36087 2.33059 5.94059 2.32932C5.53545 2.32929 5.14281 2.46959 4.82944 2.72637C4.51606 2.98315 4.30131 3.34055 4.22169 3.73779L5.20406 3.93456C5.23194 3.79509 5.29885 3.66639 5.39702 3.56345C5.49518 3.46052 5.62055 3.38757 5.75855 3.3531C5.89655 3.31864 6.0415 3.32407 6.17653 3.36876C6.31157 3.41345 6.43113 3.49557 6.52132 3.60556C6.61151 3.71555 6.66861 3.84889 6.68597 3.99006C6.70334 4.13124 6.68026 4.27444 6.61943 4.40301C6.55859 4.53158 6.46249 4.64023 6.34232 4.71632C6.22214 4.79241 6.08283 4.83281 5.94059 4.83282C5.8078 4.83282 5.68044 4.88557 5.58654 4.97947C5.49264 5.07337 5.43989 5.20073 5.43989 5.33352V6.08457H6.44129V5.76162Z"/>
        </svg>
    )
}

export default Info
