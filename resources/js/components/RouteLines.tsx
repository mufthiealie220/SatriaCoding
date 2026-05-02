import React from 'react';

export default function RouteLines() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
            <svg
                className="w-full h-full"
                viewBox="0 0 1440 900"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="routeA" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#5de3ab" />
                        <stop offset="45%" stopColor="#3ea6b0" />
                        <stop offset="100%" stopColor="#50a3cc" />
                    </linearGradient>
                    
                </defs>

                <style>{`
                    .route {
                        stroke-width: 3.5;
                        stroke-linecap: round;
                        stroke-dasharray: 8 14;
                        stroke-opacity: 0.12;
                        fill: none;
                    }

                    .dark .route {
                        stroke-opacity: 0.25;
                    }

                    @media (max-width: 768px) {
                        .route {
                            stroke-width: 2.2;
                            stroke-dasharray: 6 12;
                        }
                    }

                    @keyframes dashSlideA {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -600; }
                    }

                    @keyframes dashSlideB {
                        from { stroke-dashoffset: 0; }
                        to { stroke-dashoffset: -600; }
                    }

                    .routeA { animation: dashSlideA 6s linear infinite; }
                    .routeB { animation: dashSlideB 8.5s linear infinite; }
                `}</style>

                {/* LINE 1 */}
                <path
                    d="M-30 620C250 530 300 170 620 245C900 310 1010 760 1470 595"
                    className="route routeA"
                    stroke="url(#routeA)"
                />

                {/* LINE 2 */}
                

                {/* DOTS */}
                <path d="M628 236L645 250L618 257L628 236Z" fill="#5de3ab" fillOpacity="0.45" />
                <path d="M1084 365L1100 378L1074 386L1084 365Z" fill="#3ea6b0" fillOpacity="0.45" />
                <path d="M702 578L719 592L692 600L702 578Z" fill="#50a3cc" fillOpacity="0.45" />
            </svg>
        </div>
    );
}