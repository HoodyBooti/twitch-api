import { Enumerable } from '@d-fischer/shared-utils';
import { ApiClient } from '../../../ApiClient';

/** @private */
export interface VideoChannelData {
	_id: string;
	name: string;
	display_name: string;
}

/** @private */
export interface VideoMutedSegment {
	duration: number;
	offset: number;
}

/** @private */
export type VideoThumbSize = 'large' | 'medium' | 'small' | 'template';

/** @private */
export interface VideoThumbnail {
	type: string;
	url: string;
}

/** @private */
export type VideoViewability = 'public' | 'private';

/** @private */
export interface VideoData {
	_id: string;
	broadcast_id: string;
	broadcast_type: string;
	channel: VideoChannelData;
	created_at: string;
	description: string;
	description_html: string;
	fps: Record<string, number>;
	game: string;
	language: string;
	length: number;
	muted_segments: VideoMutedSegment[];
	preview: Record<VideoThumbSize, string>;
	published_at: string;
	resolutions: Record<string, string>;
	status: string;
	tag_list: string;
	thumbnails: Record<VideoThumbSize, VideoThumbnail[]>;
	title: string;
	url: string;
	viewable: VideoViewability;
	viewable_at: string | null;
	views: number;
}

/**
 * A Twitch video.
 */
export class Video {
	/** @private */
	@Enumerable(false) protected readonly _client: ApiClient;

	/** @private */
	constructor(/** @private */ protected _data: VideoData, client: ApiClient) {
		this._client = client;
	}

	/**
	 * The ID of the video.
	 */
	get id() {
		return this._data._id;
	}

	/**
	 * The ID of the channel the video was uploaded to.
	 */
	get channelId() {
		return this._data.channel._id;
	}

	/**
	 * The name of the channel the video was uploaded to.
	 */
	get channelName() {
		return this._data.channel.name;
	}

	/**
	 * The display name of the channel the video was uploaded to.
	 */
	get channelDisplayName() {
		return this._data.channel.display_name;
	}

	/**
	 * The date when the video was created.
	 */
	get creationDate() {
		return new Date(this._data.created_at);
	}

	/**
	 * The description of the video.
	 */
	get description() {
		return this._data.description;
	}

	/**
	 * The description of the video in HTML.
	 */
	get htmlDescription() {
		return this._data.description_html;
	}

	/**
	 * The resolutions the video is available in.
	 */
	get resolutions() {
		return this._data.resolutions;
	}

	/**
	 * Gets the FPS (frames per second) of the video for a given resolution.
	 *
	 * @param resolution The resolution to get FPS for. This is the *key* of the resolutions object.
	 */
	getFps(resolution: string): number | undefined {
		return this._data.fps[resolution];
	}

	/**
	 * The name of the game shown in the video.
	 */
	get gameName() {
		return this._data.game;
	}

	/**
	 * The language of the video.
	 */
	get language() {
		return this._data.language;
	}

	/**
	 * The length of the video, in seconds.
	 */
	get length() {
		return this._data.length;
	}

	/**
	 * The muted segments of the video.
	 */
	get mutedSegments() {
		return this._data.muted_segments;
	}

	/**
	 * Gets the URL for a given size of the video.
	 *
	 * @param size The size of the preview.
	 */
	getPreview(size: VideoThumbSize) {
		return this._data.preview[size];
	}

	/**
	 * The date when the video was published.
	 */
	get publishDate() {
		return new Date(this._data.published_at);
	}

	/**
	 * The status of the video.
	 */
	get status() {
		return this._data.status;
	}

	/**
	 * A list of tags of the video.
	 */
	get tags() {
		return this._data.tag_list.split(',');
	}

	/**
	 * Gets a list of thumbnails for a given size of the video.
	 *
	 * @param size
	 */
	getThumbnails(size: VideoThumbSize) {
		return this._data.thumbnails[size];
	}

	/**
	 * The title of the video.
	 */
	get title() {
		return this._data.title;
	}

	/**
	 * The URL of the video.
	 */
	get url() {
		return this._data.url;
	}

	/**
	 * Whether the video is public.
	 */
	get isPublic() {
		return this._data.viewable === 'public';
	}

	/**
	 * When the video will be viewable publicly.
	 */
	get viewabilityDate() {
		return this._data.viewable_at ? new Date(this._data.viewable_at) : null;
	}

	/**
	 * The number of views of the video.
	 */
	get views() {
		return this._data.views;
	}
}
