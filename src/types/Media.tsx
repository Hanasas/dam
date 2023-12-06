export interface Media {
    name: string
    url: string
    cover: string
    artist: string
    type: MediaType
    id: number
}

export enum MediaType {
    MusicType = 1,
    VideoType = 2,
    ImageType = 3,
}