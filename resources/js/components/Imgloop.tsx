import { useEffect, useRef, useMemo, useState, useCallback } from 'react';

export interface ImageItem {
    src: string;
    alt: string;
    title?: string;
}

interface ImageLoopProps {
    images: ImageItem[];
    speed?: number;
    direction?: 'left' | 'right';
    imageHeight?: number;
    imageWidth?: number;
    gap?: number;
    scaleOnHover?: boolean;
    pauseOnHover?: boolean;
}

const ANIMATION_CONFIG = {
    SMOOTH_TAU: 0.25,
    MIN_COPIES: 2,
    COPY_HEADROOM: 2,
} as const;

const useResizeObserver = (
    callback: () => void,
    elements: Array<React.RefObject<Element | null>>,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        if (!window.ResizeObserver) {
            const handleResize = () => callback();
            window.addEventListener('resize', handleResize);
            callback();
            return () => window.removeEventListener('resize', handleResize);
        }

        const observers = elements.map((ref) => {
            if (!ref.current) return null;
            const observer = new ResizeObserver(callback);
            observer.observe(ref.current);
            return observer;
        });

        callback();

        return () => observers.forEach((o) => o?.disconnect());
    }, dependencies);
};

const useImageLoader = (
    seqRef: React.RefObject<HTMLElement | null>,
    onLoad: () => void,
    dependencies: React.DependencyList
) => {
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll('img') ?? [];

        if (images.length === 0) {
            onLoad();
            return;
        }

        let remainingImages = images.length;
        const handleImageLoad = () => {
            remainingImages -= 1;
            if (remainingImages === 0) onLoad();
        };

        images.forEach((img) => {
            const htmlImg = img as HTMLImageElement;
            if (htmlImg.complete) {
                handleImageLoad();
            } else {
                htmlImg.addEventListener('load', handleImageLoad, { once: true });
                htmlImg.addEventListener('error', handleImageLoad, { once: true });
            }
        });

        return () => {
            images.forEach((img) => {
                img.removeEventListener('load', handleImageLoad);
                img.removeEventListener('error', handleImageLoad);
            });
        };
    }, dependencies);
};

const useAnimationLoop = (
    trackRef: React.RefObject<HTMLDivElement | null>,
    targetVelocity: number,
    seqWidth: number,
    seqHeight: number,
    isHovered: boolean,
    hoverSpeed: number | undefined,
    isVertical: boolean
) => {
    const rafRef = useRef<number | null>(null);
    const lastTimestampRef = useRef<number | null>(null);
    const offsetRef = useRef(0);
    const velocityRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const prefersReduced =
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const seqSize = isVertical ? seqHeight : seqWidth;

        if (seqSize > 0) {
            offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
            const transformValue = isVertical
                ? `translate3d(0, ${-offsetRef.current}px, 0)`
                : `translate3d(${-offsetRef.current}px, 0, 0)`;
            track.style.transform = transformValue;
        }

        if (prefersReduced) {
            track.style.transform = isVertical ? 'translate3d(0, 0, 0)' : 'translate3d(0, 0, 0)';
            return () => {
                lastTimestampRef.current = null;
            };
        }

        const animate = (timestamp: number) => {
            if (lastTimestampRef.current === null) lastTimestampRef.current = timestamp;

            const deltaTime = Math.max(0, timestamp - (lastTimestampRef.current ?? timestamp)) / 1000;
            lastTimestampRef.current = timestamp;

            const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;

            const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
            velocityRef.current += (target - velocityRef.current) * easingFactor;

            if (seqSize > 0) {
                let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
                nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
                offsetRef.current = nextOffset;

                const transformValue = isVertical
                    ? `translate3d(0, ${-offsetRef.current}px, 0)`
                    : `translate3d(${-offsetRef.current}px, 0, 0)`;
                track.style.transform = transformValue;
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            lastTimestampRef.current = null;
        };
    }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical]);
};

export default function ImageLoop({
    images,
    speed = 100,
    direction = 'left',
    imageHeight = 80,
        imageWidth,
    gap = 24,
    scaleOnHover = false,
    pauseOnHover = false,
}: ImageLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLDivElement>(null);
    
    // Gunakan imageWidth jika diberikan, otherwise gunakan imageHeight
    const actualWidth = imageWidth ?? imageHeight;
    const actualHeight = imageHeight;
    
    const [seqWidth, setSeqWidth] = useState<number>(0);
    const [copyCount, setCopyCount] = useState<number>(ANIMATION_CONFIG.MIN_COPIES);

    // Hitung target velocity berdasarkan direction
    const targetVelocity = useMemo(() => {
        const magnitude = Math.abs(speed);
        const directionMultiplier = direction === 'left' ? 1 : -1;
        const speedMultiplier = speed < 0 ? -1 : 1;
        return magnitude * directionMultiplier * speedMultiplier;
    }, [speed, direction]);

    // Use shared animation loop (same logic as LogoLoop) for smooth motion
    useAnimationLoop(trackRef, targetVelocity, seqWidth, 0, false, undefined, false);

    // Update dimensions dengan ResizeObserver
    const updateDimensions = useCallback(() => {
        if (seqRef.current) {
            const width = seqRef.current.getBoundingClientRect().width;
            if (width > 0) {
                setSeqWidth(width);
                // Hitung berapa banyak copy yang diperlukan
                const containerWidth = containerRef.current?.clientWidth ?? 0;
                if (containerWidth > 0) {
                    const copiesNeeded = Math.ceil(containerWidth / width) + ANIMATION_CONFIG.COPY_HEADROOM;
                    setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
                }
            }
        }
    }, []);

    // Image loader + ResizeObserver using shared helpers (same behavior as LogoLoop)
    useImageLoader(seqRef, updateDimensions, [images, gap, actualWidth, actualHeight]);
    useResizeObserver(updateDimensions, [containerRef, seqRef], [images, gap, actualWidth, actualHeight]);

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden w-full ${scaleOnHover ? 'hover:[&_img]:scale-110' : ''}`}
        >
            <div
                ref={trackRef}
                className="flex will-change-transform w-max select-none motion-reduce:transform-none"
                style={{
                    gap: `${gap}px`,
                    transform: 'translate3d(0,0,0)',
                }}
            >
                {/* Original sequence */}
                <div
                    ref={seqRef}
                    className="flex shrink-0"
                    style={{
                        gap: `${gap}px`,
                    }}
                >
                    {images.map((image, idx) => (
                        <div
                            key={idx}
                            className="shrink-0"
                            style={{
                                width: `${actualWidth}px`,
                                height: `${actualHeight}px`,
                            }}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                title={image.title}
                                className="h-full w-full rounded-lg object-cover shadow-sm"
                            />
                        </div>
                    ))}
                </div>

                {/* Duplicates untuk seamless loop */}
                {copyCount > 1 && Array.from({ length: copyCount - 1 }).map((_, copyIdx) => (
                    <div
                        key={`copy-${copyIdx}`}
                        className="flex shrink-0"
                        style={{
                            gap: `${gap}px`,
                        }}
                    >
                        {images.map((image, imgIdx) => (
                            <div
                                key={`${copyIdx}-${imgIdx}`}
                                className="shrink-0"
                                style={{
                                    width: `${actualWidth}px`,
                                    height: `${actualHeight}px`,
                                }}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    title={image.title}
                                    className="h-full w-full rounded-lg object-cover shadow-sm"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
