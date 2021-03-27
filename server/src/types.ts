export interface ImagePairs {
    img: string;
    label: 'real' | 'fake'
}

// 1 - real, 0 - fake
export interface VoteResult extends ImagePairs {
    answer: 1 | 0,
    pass: boolean
}

export interface StorageItem {
    imagesCounter: number,
    result: number,
    shouldStop?: boolean
}

export interface Storage {
    [key: string]: StorageItem
}
